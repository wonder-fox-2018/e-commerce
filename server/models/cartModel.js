'use strict'

const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const CartSchema = new Schema({
    iduser :{type : Schema.Types.ObjectId,ref : 'User'},
    itemlist :  [
        {   iditem :{type : Schema.Types.ObjectId, ref : 'Item'},
            qty: {type:Number,default:0},
            price:{type:Number,default:0}
        }]
})

const Cart = mongoose.model('Cart',CartSchema);
module.exports = Cart