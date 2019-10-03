const { composeModel } = require('meen-core');

module.exports = composeModel('Catalog', {
    name: {
        type: String
    }
}, {
    virtual: {
        url: function () {
            return `/catalog/${this._id}`;
        }
    }
});
