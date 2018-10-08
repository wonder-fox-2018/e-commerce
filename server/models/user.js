'use strict'

const mongoose = require('mongoose')
const Schema = mongoose.Schema
const beautify = require('mongoose-beautiful-unique-validation')

const UserSchema = new Schema({
    name: String,
    email: {
        type: String,
        unique: 'Email has to be unique'
    },
    password: {
        type: String
    },
    role: {
        type: String,
        default: 'user'
    },
    thirdpartylogin: {
        type: String
    }
},{
    timestamps: true
})

UserSchema.plugin(beautify)
const User = mongoose.model('User', UserSchema)

module.exports = User