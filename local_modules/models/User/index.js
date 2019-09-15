const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const uniqueValidator = require('mongoose-unique-validator');

// Schema
// --------------------------------
const userSchema = new Schema({
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
}, { timestamps: true });

// Virtual
// --------------------------------
userSchema
    .virtual('url')
    .get(function () {
        return '/user/' + this._id;
    });

// Plugin for mongoose
// ------------------------------------------
userSchema.plugin(uniqueValidator);

// Export
// --------------------------------
const UserModel = mongoose.model('User', userSchema);
module.exports = require('meen-core').utils.composeModel(UserModel);