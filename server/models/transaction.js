const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const transactionSchema = new Schema({
    user : { type: Schema.Types.ObjectId, ref: 'User' },
    itemList : [{ type: Schema.Types.ObjectId, ref: 'Item' }],
    totalPrice : {
        type: Number,
    },
}, {
    timestamps : true
});

const Transaction = mongoose.model('Transaction', transactionSchema);

module.exports = Transaction