var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var CartSchema = new Schema({
	'cartcontent': [{
		Product: {
			type: Schema.Types.ObjectId,
			ref: 'Product'
		},
		qty : Number
	}],
	'subTotal': Number,
	'shipping': Number,
	'tax': Number,
	'total': Number,
	'status': Boolean
});

module.exports = mongoose.model('Cart', CartSchema);