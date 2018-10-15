var mongoose = require('mongoose');
var Schema   = mongoose.Schema;

var CheckoutSchema = new Schema({
	'user' : {
	 	type: Schema.Types.ObjectId,
	 	ref: 'User'
	},
	'cart' : {
	 	type: Schema.Types.ObjectId,
	 	ref: 'Cart'
	}
});

module.exports = mongoose.model('Checkout', CheckoutSchema);
