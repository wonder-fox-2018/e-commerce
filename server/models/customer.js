
var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var CustSchema = new Schema({
  name: {
    type: String,
    required: true
  },
  email: {
    type: String,
    required: true,
    unique: true
  },
  password: {
    type: String,
    required: true
  }
}, {
  timestamps: true
});

var Cust = mongoose.model('Customer', CustSchema);

module.exports = Cust

// let dummy = [
//   {
//     name:,
//     email:,
//     password:
//   }
// ]