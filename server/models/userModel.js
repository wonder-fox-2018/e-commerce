'use strict'

const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const UserSchema = new Schema({
    name : {
        type : String
    },
    email : {
        type : String,
        unique : true
    },
    password : {
        type : String   
    },
    role : {
        type : String,
        default : 'user'
    }
})

const User = mongoose.model('User',UserSchema);

module.exports = User;