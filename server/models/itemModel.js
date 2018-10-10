'use strict'

const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const ItemSchema = new Schema({
    name :{type : String},
    price : {type : Number}, 
    picture:{type: String}, //multer untuk simpan gambar
    category : {type : Schema.Types.ObjectId,ref : 'Category'}
})

const Item = mongoose.model('Item',ItemSchema);

module.exports = Item