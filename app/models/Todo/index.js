const mongoose = require('mongoose');
const Schema = mongoose.Schema;

// Schema
// --------------------------------
const todoSchema = new Schema({
    text: String,
    completed: {
        type: Boolean,
        default: false
    }
}, {timestamps: true});

// Ensure virtual fields are serialised.
// --------------------------------
todoSchema.set('toJSON', {
    virtuals: true,
    versionKey: false,
    transform: function (doc, ret) {
        delete ret._id
    }
});

// Export
// --------------------------------
const TodoModel = mongoose.model('Todo', todoSchema);
module.exports = require('../../utils/modelUtils')(TodoModel);