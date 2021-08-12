const connectRealm = require('../utils/connectRealm');
const printTable = require('../utils/printTable');
const printHeading = require('../utils/printHeading');
const getServerDisplayText = require('../utils/getServerDisplayText');
const logger = require('../utils/logger');
const genUuid = require('../utils/genUuid');
const inquirer = require('inquirer');
const getCommandSyntax = require('../utils/getCommandSyntax');
const path = require('path');
const { execSync } = require('child_process');
const SftpClient = require('ssh2-sftp-client');
const colors = require('colors/safe');

module.exports = async (action, option) => {
    try {
        let selected;

        switch (action) {
            case 'add':
                await addProject(option);
                break;

            case 'edit':
                selected = await showProjectList(action);
                if (!selected) {
                    return;
                }
                await editProject(selected, option);
                break;

            case 'delete':
                selected = await showProjectList(action);
                if (!selected) {
                    return;
                }
                await deleteProject(selected);
                break;

            case 'deploy':
                selected = await showProjectList(action);
                if (!selected) {
                    return;
                }
                await deployProject(selected);
                break;

            case 'list':
            default:
                await listProject(option);
        }
    } catch (error) {
        logger.error(error);
    } finally {
        process.exit(0);
    }
};

const deployProject = async (selected) => {
    logger.info('Running build script...');
    for (let script of selected.buildScript.split('   ')) {
        execSync(script, {
            cwd: selected.localFolder,
        });
    }

    let sftpClient = new SftpClient();
    await sftpClient.connect({
        host: selected.server.host,
        port: selected.server.port,
        username: selected.server.username,
        password: selected.server.password,
    }, true);

    logger.info('Checking existing of remote folder...');
    const isExisted = await sftpClient.exists(selected.remoteFolder);

    if (!isExisted) {
        logger.info('Creating remote folder...');
        await sftpClient.mkdir(selected.remoteFolder, true);
    } else {
        logger.info(`Cleaning remote folder...`);
        await sftpClient.rmdir(selected.remoteFolder, true);
    }

    logger.info(`Coping build to ${selected.server.host}...`);
    await sftpClient.uploadDir(`${selected.localFolder}/${selected.buildFolder}`, `${selected.remoteFolder}`);

    logger.info('Running deploy script...');
    for (let script of selected.deployScript.split('   ')) {
        sftpClient.client.exec(script);
    }
    sftpClient.end();

    logger.info('=> Done!');

};

const getProjectData = async (defaultData) => {
    const realm = await connectRealm();
    const serverList = realm.objects('Server');

    if (serverList.length === 0) {
        logger.warn(`No server found!\nPlease run ${getCommandSyntax('server add')} to add server.`);
        return;
    }

    let choices = [];
    for (let server of serverList) {
        choices.push({
            value: server._id,
            name: getServerDisplayText(server),
        });
    }

    const answers = await inquirer.prompt([
        {
            type: 'input',
            name: 'name',
            message: 'Project name',
            default: defaultData ? defaultData.name : null,
        },
        {
            type: 'list',
            name: 'server',
            message: 'Server',
            default: defaultData ? defaultData.server : null,
            choices,
        },
        {
            type: 'input',
            name: 'localFolder',
            message: 'Local folder path',
            default: defaultData ? defaultData.localFolder : null,
        },
        {
            type: 'input',
            name: 'buildFolder',
            message: 'Build folder path',
            default: defaultData ? defaultData.buildFolder : 'build',
        },
        {
            type: 'input',
            name: 'remoteFolder',
            message: 'Remote folder path',
            default: defaultData ? defaultData.remoteFolder : null,
        },
        {
            type: 'input',
            name: 'buildScript',
            message: 'Build script (3 spaces for new line)',
            default: defaultData ? defaultData.buildScript : null,
        },
        {
            type: 'input',
            name: 'deployScript',
            message: 'Deploy script (3 spaces for new line)',
            default: defaultData ? defaultData.deployScript : null,
        },
    ]);

    return answers;
};

const deleteProject = async (selected) => {
    const answers = await inquirer.prompt([
        {
            type: 'confirm',
            name: 'sure',
            message: 'Are you sure to delete this project?',
        },
    ]);

    if (!answers.sure) {
        logger.warn('Aborted!');
        return;
    }

    const realm = await connectRealm();
    realm.write(() => {
        realm.delete(realm.objectForPrimaryKey('Project', selected._id));
        logger.info('=> Project is deleted!');
    });
};

const editProject = async (selected) => {
    const answers = await getProjectData(selected);

    const realm = await connectRealm();
    realm.write(() => {
        realm.create('Project', {
            _id: selected._id,
            ...answers,
            server: realm.objectForPrimaryKey('Server', answers.server),
        }, 'modified');
        logger.info('=> Project is updated!');
    });
};

const showProjectList = async (action) => {
    const realm = await connectRealm();
    const projectList = realm.objects('Project');

    if (projectList.length === 0) {
        logger.warn(`No project found!\nPlease run ${getCommandSyntax('project add')} to add project.`);
        return;
    }

    let choices = [];
    for (let project of projectList) {
        choices.push({
            value: project._id,
            name: project.name,
        });
    }

    const answers = await inquirer.prompt([
        {
            type: 'list',
            name: 'project',
            message: `Select project which you want to ${action}`,
            choices,
        },
    ]);

    return projectList.filter(project => project._id === answers.project)[0];
};

const addProject = async () => {
    const answers = await getProjectData();

    const realm = await connectRealm();
    realm.write(() => {
        realm.create('Project', {
            _id: genUuid(),
            ...answers,
            server: realm.objectForPrimaryKey('Server', answers.server),
        });
        logger.info('=> Project is created!');
    });
};

const listProject = async () => {
    const realm = await connectRealm();
    const projectList = realm.objects('Project');

    printHeading('Project');
    printTable(
        ['Name', 'Server', 'Folder', 'Build script', 'Deploy script'],
        projectList.map(task => [
            task.name,
            getServerDisplayText(task.server),
            [
                `${colors.bold('Local : ')}${task.localFolder}`,
                `${colors.bold('Build : ')}${path.join(task.localFolder, task.buildFolder)}`,
                `${colors.bold('Remote: ')}${task.remoteFolder}`,
            ].join('\n'),
            task.buildScript.replace(/\s{3}/g, '\n').replace(/\s{3}/g, '\n'),
            task.deployScript.replace(/\s{3}/g, '\n').replace(/\s{3}/g, '\n'),
        ]),
    );
};
