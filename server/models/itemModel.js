const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const itemSchema = new Schema({
    name: String,
    price: Number,
    stock: Number,
    imgURL: String
}, {
    timestamps: true
});

const Item = mongoose.model('Item', itemSchema);

module.exports = Item;
