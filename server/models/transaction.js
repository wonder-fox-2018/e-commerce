'use strict'

const mongoose = require('mongoose')
const Schema = mongoose.Schema

const TransactionSchema = new Schema({
    transactionuserid: {
        type: Schema.Types.ObjectId,
        ref: 'User',
        required: [true, 'user id required']
    },
    transactionitemid: [{
        type: Schema.Types.ObjectId,
        ref: 'Item',
        required: [true, 'item id required']
    }],
    transactionamount: {
        type: Number,
        min: [0,'Negative value is not accepted']
    }
},{
    timestamps: true
})

const Transaction = mongoose.model('Transaction', TransactionSchema)

module.exports = Transaction