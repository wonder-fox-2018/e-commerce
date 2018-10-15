const mongoose = require('mongoose'),
    Schema = mongoose.Schema;

const itemScheme = new Schema({
    name: {
        type: String,
        required: true,
        unique: true
    },
    desc: String,
    imageurl: {
        type: String,
    }, 
    price: Number,
    stock: Number,
    category: {
        type: Schema.Types.ObjectId,
        ref: 'Category',  
    }
}, {
    timestamps: true
});

const Item = mongoose.model('Item', itemScheme)
module.exports = Item