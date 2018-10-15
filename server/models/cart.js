const mongoose = require('mongoose'),
      Schema = mongoose.Schema;

const cartScheme = new Schema({

    list: [{
        type: Schema.Types.ObjectId,
        ref: 'Item'
    }]
}, {
    timestamps: true
});

const Cart = mongoose.model('Cart', cartScheme)
module.exports = Cart