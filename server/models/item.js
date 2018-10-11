const mongoose = require('mongoose'),
      Schema = mongoose.Schema;

const itemScheme = new Schema({
    name: String,
    quantity: Number,
    price: Number,
    rating: String,
    description: String,
    image: { data: Buffer, contentType: String },
    category: String
    // reviews: [{
    //     type: Schema.Types.ObjectId,
    //     ref: 'Review'
    // }]
}, {
    timestamps: true
});

const Item = mongoose.model('Item', itemScheme)
module.exports = Item