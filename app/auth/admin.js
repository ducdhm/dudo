module.exports = (req, res, next) => {
    var user = req.user;
    if (req.user.god) {
        next();
    } else {
        var adminLogin = user.admin || false;

        if (adminLogin) {
            next();
        } else {
            var err = new Error('Bạn không có quyền xem trang này');
            err.status = 403;
            next(err);
        }
    }
};
