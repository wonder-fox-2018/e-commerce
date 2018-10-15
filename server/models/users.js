const mongoose = require('mongoose')
const Schema = mongoose.Schema;

var isEmail = function(val) {
    var re = /^(([^<>()[\]\\.,;:\s@\"]+(\.[^<>()[\]\\.,;:\s@\"]+)*)|(\".+\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    return re.test(val);
}

const userSchema = new Schema({
    name: {
        type: String,
        required: [true, 'wajib diisi']
    },
    email:  {
        type: String,
        unique: true,
        required: true,
        validate: isEmail
    },
    password: {
        type: String,
        minlength:[5, 'password min 5'],
        required: true
    },
    isAdmin: {
        type: Boolean,
        default: false
    }
}, {
    timestamps: true
});

var User = mongoose.model('User', userSchema)

module.exports = User;