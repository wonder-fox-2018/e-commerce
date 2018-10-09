var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var transactionSchema = new Schema({
    product: [{type: Schema.Types.ObjectId, ref: 'Product'}]
    ,
    quantity:[{
        type:Number
    }],
});

var Transaction = mongoose.model('Transaction', transactionSchema);

module.exports=Transaction