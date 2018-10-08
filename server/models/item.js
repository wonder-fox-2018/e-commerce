'use strict'

const mongoose = require('mongoose')
const Schema = mongoose.Schema

const ItemSchema = new Schema({
    itemname: String,
    itembrand: String,
    itemdescription: String,
    itemcategory: String,
    itemurlimage: String,
    itemwebsitelink: String,
    itemstock: {
        type:Number,
        default: 0
    }
},{
    timestamps: true
})

const Item = mongoose.model('Item', ItemSchema)

module.exports = Item