const { composeApp, modules } = require('meen-core');
const app = composeApp('setup', [modules.mongoose]);
const logger = app.logger('setup');
const UserModel = require('models/User');
const bcrypt = require('bcryptjs');

(async () => {
    try {
        await setupUser('meen', 'Meen@2018');
    } catch (error) {
    } finally {
        process.exit(0);
    }
})();

async function setupUser(username, password) {
    try {
        let user = await UserModel.findOne({
            query: { username: username }
        });

        user = user || UserModel.create();
        await UserModel.save(user, {
            admin: true,
            god: true,
            username,
            password: bcrypt.hashSync(password)
        });
        logger.info(`Setup "${username}" is done!`);
    } catch (error) {
        logger.error(`Can not setup "${username}" user: %o`, error);
    }
}
