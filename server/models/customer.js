const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const customerSchema = new Schema({
    email: String,
    password: String,
    first_name: String,
    last_name: String,
    cart: {
        type: Schema.Types.ObjectId,
        ref: 'Cart'
    }
}, {
    timestamps: true
})

var Customer = mongoose.model('Customer', customerSchema);

module.exports = Customer;