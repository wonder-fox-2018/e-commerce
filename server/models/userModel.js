const mongoose = require('mongoose')
const Schema = mongoose.Schema

const userSchema = new Schema({
    email: {
      type: String,
      required: true
    },
    password: {
      type: String,
      required: true
    },
    gSignIn: {
      type: Number,
      default: 0
    },
    isAdmin: {
      type: Number,
      default: 0
    },
    cart: {
      type: Array
    },
    items: {
      type: Array
    },
    totalsum: {
      type: Number,
      default: 0
    },
    transaction: {
      type: Array
    }
}, {
  timestamps: true
});

const User = mongoose.model('User', userSchema)
module.exports = User