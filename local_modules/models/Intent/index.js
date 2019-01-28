const mongoose = require('mongoose');
const Schema = mongoose.Schema;

// Schema
// --------------------------------
const intentSchema = new Schema({
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
}, { timestamps: true });

// Virtual
// --------------------------------
intentSchema
    .virtual('url')
    .get(function () {
        return '/intent/' + this._id;
    });

// Export
// --------------------------------
const IntentModel = mongoose.model('Intent', intentSchema);
module.exports = require('meen/utils/modelUtils')(IntentModel);