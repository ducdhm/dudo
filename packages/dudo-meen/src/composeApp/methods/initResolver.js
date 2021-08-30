const { ObjectId } = require('mongoose').Types;
const { newError } = require('@dudojs/utils')

module.exports = (app, Model, propName, handler, ignoreNew = false) => async (req, res, next) => {
    const id = req.params.id;
    let record = null;

    if (ObjectId.isValid(id)) {
        if (typeof handler === 'function') {
            record = await handler(req);
        } else {
            record = await Model.findById(id);
        }
    }

    if (!ignoreNew) {
        if (id === 'new') {
            record = new Model();
        }
    }

    if (record === null) {
        return next(newError(404));
    }

    req[propName] = record;
    next();
};
