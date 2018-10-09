const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const categorySchema = new Schema({
    name: String,
    items: [{
        type: Schema.Types.ObjectId, ref: 'Item'
    }]
}, {
    timestamps: true
})

var Category = mongoose.model('Category', categorySchema);

module.exports = Category;