const passport = require('passport');

module.exports = (app) => {
    const logger = app.logger('controllers/loginController');
    const loginController = {};
    loginController.checkLogin = (req, res) => {
        if (!req.user) {
            logger.info('Show login page');
            res.render('login/login');
        } else {
            logger.info('Already logged-in. Redirect to /');
            res.redirect('/');
        }
    };
    
    loginController.doLogin = (req, res, next) => {
        logger.info('doLogin');
        passport.authenticate('local', (err, user) => {
            if (err) {
                return next(err);
            }
            
            if (!user) {
                return res.json({
                    status: false,
                    message: 'Username or password is invalid!'
                });
            }
            
            req.logIn(user, err => {
                if (err) {
                    return next(err);
                }
                
                return res.json({
                    status: true,
                    data: {
                        returnTo: req.session.returnTo || '/'
                    }
                });
            });
        })(req, res, next);
    };
    
    loginController.doLogout = (req, res) => {
        logger.info('doLogout');
        req.logout();
        res.redirect('/');
    };
    
    return loginController;
};
