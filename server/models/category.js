'use strict'

const mongoose = require('mongoose')
const Schema = mongoose.Schema

const CategorySchema = new Schema({
    name: {
        type: String,
        required: [true, 'Category name should not be empty']
    },
    listitemcategory: [{
        type: Schema.Types.ObjectId,
        ref: 'Item'
    }]
},{
    timestamps: true
})

const Category = mongoose.model('Category', CategorySchema)

module.exports = Category