const mongoose = require('mongoose');
const Schema = mongoose.Schema;

// Schema
// --------------------------------
const categorySchema = new Schema({
    catalog: {
        type: Schema.Types.ObjectId, 
        ref: 'Catalog'
    },
    name: {
        type: String
    }
}, { timestamps: true });

// Virtual
// --------------------------------
categorySchema
    .virtual('url')
    .get(function () {
        return '/category/' + this._id;
    });

// Export
// --------------------------------
const CategoryModel = mongoose.model('Category', categorySchema);
module.exports = require('meen-core').utils.composeModel(CategoryModel);