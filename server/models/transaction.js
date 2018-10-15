const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const transactionSchema = new Schema({
    userId: {
        type: Schema.Types.ObjectId,
        ref: 'User'
    },
    purchased_item: [{
        name: String,
        qty: Number,
        sub_total: Number
    }],
    total_price: Number

}, {
    timestamps: true
})

var Transaction = mongoose.model('Transaction', transactionSchema);

module.exports = Transaction;