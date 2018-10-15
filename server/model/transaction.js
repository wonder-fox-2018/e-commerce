var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var transactionSchema = new Schema({
    product: [{type: Schema.Types.ObjectId, ref: 'Product'}]
    ,
    quantity:[{
        type:Number
    }],
    user:{type: Schema.Types.ObjectId, ref: 'User'},
    date: { type: Date, default: new Date() }
});

var Transaction = mongoose.model('Transaction', transactionSchema);

module.exports=Transaction