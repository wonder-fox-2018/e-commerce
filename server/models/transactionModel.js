'use strict'

const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const TransactionSchema = new Schema({
    userid : {type : Schema.Types.ObjectId,ref : 'User'},
    itemslist : [ { type : Schema.Types.ObjectId, ref : 'Item'}],
    amount: Number,
    date : {
        type : Date,
        default : new Date()
    }
})

const Transaction = mongoose.model('Transaction',TransactionSchema);

module.exports = Transaction