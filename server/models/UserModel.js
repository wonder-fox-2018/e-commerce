var mongoose = require('mongoose');
var Schema   = mongoose.Schema;

var UserSchema = new Schema({
	'username' : String,
	'email' : String,
	'password' : String,
	'role' : String,
	'cart' : {
	 	type: Schema.Types.ObjectId,
	 	ref: 'Cart'
	}
});

module.exports = mongoose.model('User', UserSchema);
