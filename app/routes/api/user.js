const auth = require('../../auth/api');
const UserModel = require('../../models/User');
const config = require('../../utils/config');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const logger = require('../../utils/logger')('api/user');

module.exports = app => {
    app.get('/api/users/', auth, async (req, res, next) => {
        try {
            const users = await UserModel.find();
            
            return res.json({
                users
            });
        } catch (error) {
            next(error);
        }
    });
    
    app.post('/api/login', async (req, res, next) => {
        try {
            const {username, password} = req.body;
            const user = await UserModel.findOne({
                query: {
                    username
                },
                select: '+password'
            });
            
            if (user && bcrypt.compareSync(password, user.password)) {
                const payload = {
                    username
                };
                const jwtToken = jwt.sign(payload, config.jwt.secret, {
                    expiresIn: config.jwt.expires
                });
                
                logger.info('jwtToken: ' + jwtToken);
                
                return res.json({
                    access_token: jwtToken,
                    username
                });
            } else {
                return res.json({
                    status: false,
                    message: 'Username or password invalid'
                })
            }
            
        } catch (error) {
            next(error);
        }
    });
    
    app.post('/api/register', async (req, res, next) => {
        try {
            let user = await UserModel.save(UserModel.create(), {
                username: req.body.username,
                password: bcrypt.hashSync(req.body.password)
            });
            
            user.password = undefined;
            
            return res.json({
                status: true,
                data: user,
                message: 'Registered'
            });
        } catch (error) {
            next(error);
        }
    });
    
};
