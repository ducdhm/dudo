module.exports = (req, res, next) => {
    if (req.user.god) {
        next();
    } else {
        if (req.user.admin) {
            next();
        } else {
            var err = new Error('You do not have permission to view this page!');
            err.status = 403;
            next(err);
        }
    }
};
