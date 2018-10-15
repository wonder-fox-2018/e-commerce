const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const itemSchema = new Schema({
    name: String,
    price: Number,
    picture: String,
    stock: Number,
    category:String
}, {
    timestamps: true
})

var Item = mongoose.model('Item', itemSchema);

module.exports = Item;