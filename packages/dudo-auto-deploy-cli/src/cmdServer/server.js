const connectRealm = require('../utils/connectRealm');
const printTable = require('../utils/printTable');
const printHeading = require('../utils/printHeading');
const getServerDisplayText = require('../utils/getServerDisplayText');
const logger = require('../utils/logger');
const genUuid = require('../utils/genUuid');
const inquirer = require('inquirer');
const getCommandSyntax = require('../utils/getCommandSyntax');

module.exports = async (action, option) => {
    try {
        if (option.insecure) {
            logger.warn('People can see your password!');
        }

        let selected;

        switch (action) {
            case 'add':
                await addServer(option);
                break;

            case 'edit':
                selected = await showServerList(action);
                if (!selected) {
                    return;
                }
                await editServer(selected, option);
                break;

            case 'delete':
                selected = await showServerList(action);
                if (!selected) {
                    return;
                }
                await deleteServer(selected);
                break;

            case 'list':
            default:
                await listServer(option);
        }
    } catch (error) {
        logger.error(error);
    } finally {
        process.exit(0);
    }
};

const getServerData = async (option, defaultData) => {
    const answers = await inquirer.prompt([
        {
            type: 'input',
            name: 'name',
            message: 'Server name',
            default: defaultData ? defaultData.name : null,
        },
        {
            type: 'input',
            name: 'host',
            message: 'Server host',
            default: defaultData ? defaultData.host : null,
        },
        {
            type: 'input',
            name: 'port',
            message: 'Server port',
            default: defaultData ? defaultData.port : null,
        },
        {
            type: 'input',
            name: 'username',
            message: 'Username',
            default: defaultData ? defaultData.username : null,
        },
        {
            type: option.insecure ? 'input' : 'password',
            name: 'password',
            message: 'Password',
            default: defaultData ? defaultData.password : null,
            mask: '*',
        },
    ]);

    return answers;
};

const deleteServer = async (selected) => {
    const answers = await inquirer.prompt([
        {
            type: 'confirm',
            name: 'sure',
            message: 'Are you sure to delete this server?',
        },
    ]);

    if (!answers.sure) {
        logger.warn('Aborted!');
        return;
    }

    const realm = await connectRealm();
    realm.write(() => {
        realm.delete(realm.objectForPrimaryKey('Server', selected._id));
        logger.info('=> Server is deleted!');
    });
};

const editServer = async (selected, option) => {
    const answers = await getServerData(option, selected);

    const realm = await connectRealm();
    realm.write(() => {
        realm.create('Server', {
            _id: selected._id,
            ...answers,
        }, 'modified');
        logger.info('=> Server is updated!');
    });
};

const showServerList = async (action) => {
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
            type: 'list',
            name: 'server',
            message: `Select server which you want to ${action}`,
            choices,
        },
    ]);

    return serverList.filter(server => server._id === answers.server)[0];
};

const addServer = async (option) => {
    const answers = await getServerData(option);

    const realm = await connectRealm();
    realm.write(() => {
        realm.create('Server', {
            _id: genUuid(),
            ...answers,
        });
        logger.info('=> Server is created!');
    });
};

const listServer = async (option) => {
    const realm = await connectRealm();
    const serverList = realm.objects('Server');

    printHeading('Server');
    printTable(
        ['Name', 'Host', 'Port', 'Username', 'Password'],
        serverList.map(server => [
            server.name,
            server.host,
            server.port,
            server.username,
            option.insecure ? server.password : '********',
        ]),
    );
};
