const auth = require('../auth/api');

module.exports = app => {
    app.get('/ping', (req, res, next) => {
        res.send('pong');
    });
    
    app.get('/api/ping', auth, (req, res, next) => {
        res.json({
            'status': true,
            username: req.user.username
        });
    });
};
