const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const validate = require('mongoose-validator');

var nameValidator = [
  validate({
    validator: 'isLength',
    arguments: [3, 50],
    message: 'Name should be between {ARGS[0]} and {ARGS[1]} characters',
  }),
  validate({
    validator: 'isAlphanumeric',
    passIfEmpty: true,
    message: 'Name should contain alpha-numeric characters only',
  }),
]

const userSchema = new Schema({
  name:   {
    type: String,
    required: [true,'Error "name" is required'],
    validate: nameValidator
  },
  email: {
    type: String,
    required: [true, 'Error "email" is required'],
    validate: nameValidator
  },
  password: {
    type: String,
    required: [true, 'Error "password" is required']
  },
  isAdmin: {
    type : Boolean
  },
  transactionList: [{ type: Schema.Types.ObjectId, ref: 'Transaction' }]
}, {
    timestamps : true
});

const User = mongoose.model('User', userSchema);

module.exports = User