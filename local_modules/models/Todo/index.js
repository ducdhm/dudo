const { composeModel } = require('meen-core');

module.exports = composeModel('Todo', {
    text: String,
    completed: {
        type: Boolean,
        default: false
    }
}, {
    set: {
        toJSON: {
            virtuals: true,
            versionKey: false,
            transform: function (doc, ret) {
                delete ret._id
            }
        }
    }
});
