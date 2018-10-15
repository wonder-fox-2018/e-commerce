const mongoose = require('mongoose')
const Schema = mongoose.Schema

const productSchema = new Schema({
    title : {
        type : String,
        required : [true, 'Title must be filled']
    },
    description : {
        type : String,
        default : null
    },
    price : {
        type : Number,
        required : [true, 'Price must be filled']
    },
    img : {
        type : String,
        default : 'https://images-na.ssl-images-amazon.com/images/I/51-RTTuzRHL._SL500_AC_SS350_.jpg'
    },
    category : {
        type : String    
    },
    quantity : {
        type : Number,
        default : 0
    },
    total : {
        type : Number
    },
    admin :{
        type : Schema.Types.ObjectId,
        ref : 'User'
    },
}, {
    timestamps : true
})

const Product = mongoose.model('Product', productSchema)

module.exports = Product