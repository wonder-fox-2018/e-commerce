'use strict'

const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const CartSchema = new Schema({
    iduser :{type : Schema.Types.ObjectId,ref : 'User'},
    quatity : {type : Number}, 
    price:{type:Number},
    itemlist :  [{type : Schema.Types.ObjectId, ref : 'Item'}]
})

const Cart = mongoose.model('Cart',CartSchema);

module.exports = Item