const logger = require('./app/utils/logger')('setup');
const UserModel = require('./app/models/User');
const bcrypt = require('bcryptjs');

require('./app/core/mongoose')();

(async () => {
    try {
        let admin = await UserModel.findOne({
            query: {username: 'god'}
        });

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
    admin.username = 'god';
    admin.password = bcrypt.hashSync('Meen@2018');

    return admin;
}