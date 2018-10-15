const mongoose = require('mongoose')
const Schema = mongoose.Schema;

const cartSchema = new Schema({
    userId: {
        type: Schema.Types.ObjectId,
        ref: 'Customer',
        required: true
    },
    items: {

    }
}, {
    timestamps: true
});

var cart = mongoose.model('Cart', cartSchema)

module.exports = cart;