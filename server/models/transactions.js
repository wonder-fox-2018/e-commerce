const mongoose = require('mongoose'),
    Schema = mongoose.Schema;

const transScheme = new Schema({
    user: {
        type: Schema.Types.ObjectId,
        ref: 'User',
        required: true
    },
    itemlist: [{
        type: Schema.Types.ObjectId,
        ref: 'Item'
    }]
    // totalPrice: Number
}, {
    timestamps: true
});

const Transaction = mongoose.model('Transaction', transScheme)
module.exports = Transaction