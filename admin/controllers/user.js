const {errorHandlers} = require('meen-core').utils;
const UserModel = require('models/User');
const bcrypt = require('bcryptjs');

module.exports = (app) => {
    const logger = app.logger('controllers/userController');
    const userController = {};
    userController.resolver = async (req, res, next) => {
        const userId = req.params.userId;
        let user = null;
        
        if (UserModel.isValidId(userId)) {
            user = await UserModel.findOne({
                query: {
                    _id: userId,
                    god: false
                }
            });
        }
        
        if (userId === 'new') {
            user = UserModel.create();
        }
        
        if (user === null) {
            return next(errorHandlers.error404());
        }
        
        req._user = user;
        next();
    };
    
    userController.showUsers = async (req, res) => {
        try {
            const users = await UserModel.find({
                query: {god: false}
            });
            logger.debug('getUsers =>%o', users);
            
            return res.render('user/index', {
                title: 'Manage users',
                users
            });
        } catch (err) {
            next(err);
        }
    };
    
    userController.showUserDetails = async (req, res, next) => {
        const userId = req.params.userId;
        
        try {
            let user;
            let title;
            if (userId === 'new') {
                user = null;
                title = 'Add user';
            } else if (req._user) {
                user = req._user;
                title = 'Edit user';
            } else if (req.url === '/profile') {
                user = req.user;
                title = 'Edit profile';
            }
            
            return res.render('user/details', {
                title,
                user
            });
        } catch (err) {
            next(err);
        }
    };
    
    userController.saveUser = async (req, res, next) => {
        try {
            await UserModel.save(req.url === '/profile' ? req.user : req._user, req.body, populateUser);
            
            return res.json({
                status: true
            });
        } catch (err) {
            return errorHandlers.jsonError(err, res);
        }
    };
    
    userController.deleteUser = async (req, res, next) => {
        try {
            await UserModel.delete(req._user);
            
            return res.json({
                status: true
            });
        } catch (err) {
            return errorHandlers.jsonError(err, res);
        }
    };
    
    return userController;
};

function populateUser(user, payload) {
    user.username = payload.username;
    user.admin = payload.admin;
    
    if (payload.password) {
        user.password = bcrypt.hashSync(payload.password);
    }
    
    return user;
}
