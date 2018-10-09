var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var cartSchema = new Schema({
    product: {type: Schema.Types.ObjectId, ref: 'Product'}
    ,
    quantity:{
        type:Number
    },
    user:{type: Schema.Types.ObjectId, ref: 'User'}
});

var Cart = mongoose.model('Cart', cartSchema);

module.exports=Cart