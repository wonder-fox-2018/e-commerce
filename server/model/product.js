var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var productSchema = new Schema({
    name : {
        type:String,
        required:true
    }
    ,
    description :{
        type:String,
        required:true
    },
    imgUrl:{
        type:String
    },
    stock:{
        type:Number,
        required:true
    },
    price:{type: Number, required: true },
    category:{type: Schema.Types.ObjectId, ref: 'Category'}
});

var Product = mongoose.model('Product', productSchema);

module.exports=Product