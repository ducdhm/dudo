module.exports = (req, res, next) => {
    req.returnJsonError = true;
    next();
};
