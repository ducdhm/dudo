const LocalStrategy = require('passport-local').Strategy;
const bcrypt = require('bcryptjs');
const passport = require('passport');
const UserModel = require('models/User');

module.exports = (app) => {
    app.use(passport.initialize());
    app.use(passport.session());
    
    passport.serializeUser((user, next) => {
        next(null, user._id);
    });
    
    passport.deserializeUser(async (id, next) => {
        try {
            const user = await UserModel.findById(id);
            next(null, user);
        } catch (error) {
            next(error);
        }
    });
    
    passport.use(new LocalStrategy({
            usernameField: 'username',
            passwordField: 'password',
            passReqToCallback: true
        },
        async (req, username, password, next) => {
            try {
                const user = await UserModel.findOne({
                    query: {username: username},
                    select: '+password'
                });
                
                if (!user) {
                    return next(null, false, {
                        message: 'Your username or password is invalid!'
                    });
                }
                
                let result = await bcrypt.compare(password, user.password);
                if (result) {
                    return next(null, user);
                } else {
                    return next(null, false, {
                        message: 'Your username or password is invalid!'
                    });
                }
            } catch (error) {
                next(error);
            }
        }
    ));
};
