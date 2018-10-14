const mongoose = require('mongoose')
const Schema = mongoose.Schema

const transactionSchema = new Schema ({
    user : {
        type : Schema.Types.ObjectId,
        ref : 'User'
    },
    list_item : Array,
    total_item : Number,
    price_count : Number,
    status : {
        type : String,
        default : 'pending'
    }
}, {
    timestamps : true
})

const Transaction = mongoose.model('Transaction', transactionSchema)
module.exports = Transaction