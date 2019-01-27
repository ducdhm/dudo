const mongoose = require('mongoose');
const Schema = mongoose.Schema;

// Schema
// --------------------------------
const catalogSchema = new Schema({
    name: {
        type: String
    }
}, { timestamps: true });

// Virtual
// --------------------------------
catalogSchema
    .virtual('url')
    .get(function () {
        return '/catalog/' + this._id;
    });

// Export
// --------------------------------
const CatalogModel = mongoose.model('Catalog', catalogSchema);
module.exports = require('../../utils/modelUtils')(CatalogModel);