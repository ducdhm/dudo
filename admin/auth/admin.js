module.exports = (req, res, next) => {
    var user = req.user;
    if (req.user.god) {
        next();
    } else {
        var adminLogin = user.admin || false;

        if (adminLogin) {
            next();
        } else {
            var err = new Error('You do not have permission to view this page!');
            err.status = 403;
            next(err);
        }
    }
};
