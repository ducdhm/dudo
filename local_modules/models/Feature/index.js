const { composeModel } = require('meen-core');
const mongoose = require('mongoose');
const Schema = mongoose.Schema;

module.exports = composeModel('Feature', {
    category: {
        type: Schema.Types.ObjectId,
        ref: 'Category'
    },
    name: {
        type: String
    }
}, {
    virtual: {
        url: function () {
            return `/feature/${this._id}`;
        }
    }
});
