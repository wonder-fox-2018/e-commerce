const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const itemSchema = new Schema({
    name : {
        type : String
    },
    description : {
        type : String
    },
    price : {
        type : Number
    },
    img : {
        type : String
    },
    stock : {
        type : Number
    }
    ,
    category : {type: Schema.Types.ObjectId, ref: 'Category' }
},{
    timestamps : true
})

const Item = mongoose.model('Item', itemSchema);

module.exports = Item