const connectRealm = require('../utils/connectRealm');
const genUuid = require('../utils/genUuid');
const { table } = require('table');
const inquirer = require('inquirer');

module.exports = (logger) => (action, id) => {
    switch (action) {
        case 'add':
            addServer(logger);
            break;

        case 'edit':

            break;
        case 'delete':

            break;

        case 'list':
        default:
            listServer(logger);
    }
};

const addServer = async (logger) => {
    try {
        const answers = await inquirer.prompt([
            {
                type: 'input',
                name: 'name',
                message: 'Server name',
            },
            {
                type: 'input',
                name: 'host',
                message: 'Server host',
            },
            {
                type: 'input',
                name: 'port',
                message: 'Server port',
            },
            {
                type: 'input',
                name: 'username',
                message: 'Username',
            },
            {
                type: 'password',
                name: 'password',
                message: 'Password',
                mask: '*',
            },
        ]);

        const realm = await connectRealm();
        realm.write(() => {
            realm.create('server', {
                _id: genUuid(),
                ...answers,
            });
            logger.info('Server is created!');
        });
    } catch (error) {
        logger.error(error);
    } finally {
        process.exit(0);
    }
};

const listServer = async (logger) => {
    try {
        const realm = await connectRealm();
        const tasks = realm.objects('server');

        let data = [];
        tasks.forEach(task => {
            data.push([
                task._id,
                task.name,
                task.host,
                task.port,
                task.username,
                task.password,
            ]);
        });

        console.log(table([
            ['ID', 'Name', 'Host', 'Port', 'Username', 'Password'],
            ...data,
        ]));
    } catch (error) {
        logger.error(error);
    } finally {
        process.exit(0);
    }
};
