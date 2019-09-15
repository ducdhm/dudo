const mongoose = require('mongoose');
const Schema = mongoose.Schema;

// Schema
// --------------------------------
const featureSchema = new Schema({
    category: {
        type: Schema.Types.ObjectId,
        ref: 'Category'
    },
    name: {
        type: String
    }
}, { timestamps: true });

// Virtual
// --------------------------------
featureSchema
    .virtual('url')
    .get(function () {
        return '/feature/' + this._id;
    });

// Export
// --------------------------------
const FeatureModel = mongoose.model('Feature', featureSchema);
module.exports = require('meen-core').utils.composeModel(FeatureModel);