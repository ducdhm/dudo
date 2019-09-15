const meen = require('meen-core');
const app = meen.composeApp('setup', [meen.mongoose]);
const logger = app.logger('setup');
const UserModel = require('models/User');
const bcrypt = require('bcryptjs');

(async () => {
    try {
        let admin = await UserModel.findOne({
            query: {username: 'god'}
        });

        logger.info(admin);

        admin = admin || UserModel.create();
        await UserModel.save(admin, {}, populateAdmin);
        logger.info('Setup admin is done!');
    } catch (error) {
        logger.error('Can not setup admin user: %o', error);
    } finally {
        process.exit(0);
    }
})();

function populateAdmin(admin) {
    admin.admin = true;
    admin.god = true;
    admin.username = 'meen';
    admin.password = bcrypt.hashSync('Meen@2018');

    return admin;
}
