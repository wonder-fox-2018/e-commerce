'use strict'

const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const CategorySchema = new Schema({
    name : {type : String},
    itemlist : [{ type : Schema.Types.ObjectId, ref : 'Item'}]
})

const Category = mongoose.model('Category',CategorySchema);

module.exports = Category
