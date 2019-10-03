const { composeModel } = require('meen-core');
const mongoose = require('mongoose');
const Schema = mongoose.Schema;

module.exports = composeModel('Category', {
    catalog: {
        type: Schema.Types.ObjectId,
        ref: 'Catalog'
    },
    name: {
        type: String
    }
}, {
    virtual: {
        url: function () {
            return `/category/${this._id}`;
        }
    }
});
