module.exports = (app, req, permission) => {
    let { config: { role } } = app;
    let userPermission = role[req.user.role];

    if (req.user.god) {
        return true;
    }

    return userPermission.indexOf(permission) !== -1;
};
