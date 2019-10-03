const { composeModel } = require('meen-core');
const mongoose = require('mongoose');
const Schema = mongoose.Schema;

module.exports = composeModel('Intent', {
    text: {
        type: String
    },
    catalog: [{
        type: Schema.Types.ObjectId,
        ref: 'Catalog'
    }],
    category: [{
        type: Schema.Types.ObjectId,
        ref: 'Category'
    }],
    feature: [{
        type: Schema.Types.ObjectId,
        ref: 'Feature'
    }]
}, {
    virtual: {
        url: function () {
            return `/intent/${this._id}`;
        }
    }
});
