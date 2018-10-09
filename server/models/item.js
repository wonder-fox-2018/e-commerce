'use strict'

const mongoose = require('mongoose')
const Schema = mongoose.Schema

const ItemSchema = new Schema({
    itemname: {
        type: String,
        required: [true, 'Name of item can not be empty']
    },
    itemcategoryid: {
        type: Schema.Types.ObjectId,
        ref: 'Category',
        required: [true, 'Name of category can not be empty']
    },
    itemurlimage: String,
    itemprice: {
        type:Number,
        default: 0,
        min: [0, 'Price can not have negative value']
    }
},{
    timestamps: true
})

const Item = mongoose.model('Item', ItemSchema)

module.exports = Item