const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const userSchema = new Schema({
    email: String,
    password: String,
    first_name: String,
    last_name: String
}, {
    timestamps: true
})

var User = mongoose.model('User', userSchema);

module.exports = User;