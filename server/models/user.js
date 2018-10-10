const mongoose = require('mongoose')
const Schema = mongoose.Schema
const bcrypt = require('bcrypt')

const userSchema = new Schema({
    email : {
        type : String,
        required : [true, 'Email must be filled'],
        unique : [true, 'Email has already use']
    },
    password : {
        type : String,
        required : [true , 'Password must be filled']
    },
    name : {
        type : String,
        required : [true, 'Name must be filled']
    },
    isGoogle:{
        type : Boolean,
        default : false
    },
    address :{
        type : String,
        required : [true, 'Address must be filled']
    },
    city : {
        type : String,
        required : String,
        required : [true, 'City must be filled']
    },
    state : {
        type : String,
        required : [true, 'state must be filled']
    },
    zip :{
        type : String,
        required : [true, 'Zip code must be filled']
    },
    transaction : [{
        type : Schema.Types.ObjectId,
        ref: 'Transaction'
    }]
})

userSchema.pre('save', function(next) {
    const salt = bcrypt.genSaltSync(10);
    const hash = bcrypt.hashSync(this.password, salt);
    this.password = hash
    next()
})

var User = mongoose.model('User', userSchema)

module.exports = User