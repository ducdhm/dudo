const { composeModel } = require('meen-core');
const uniqueValidator = require('mongoose-unique-validator');

module.exports = composeModel('User', {
    password: {
        type: String,
        select: false
    },
    username: {
        type: String,
        unique: true
    },
    createdDate: {
        type: Date,
        default: Date.now
    },
    admin: {
        type: Boolean,
        default: false
    },
    god: {
        type: Boolean,
        default: false
    }
}, {
    virtual: {
        url: function () {
            return `/user/${this._id}`;
        }
    },
    plugin: [
        uniqueValidator
    ]
});
