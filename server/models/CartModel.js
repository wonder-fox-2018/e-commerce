var mongoose = require('mongoose');
var Schema = mongoose.Schema;
var deepPopulate = require('mongoose-deep-populate')(mongoose)
var CartSchema = new Schema({
	'cartcontent': [{
		Product: {
			type: mongoose.Schema.Types.ObjectId,
			ref: 'Product',
			autopopulate: true
		},
		qty : Number
	}],
	'subTotal': Number,
	'shipping': Number,
	'tax': Number,
	'total': Number,
	'status': Boolean
});

CartSchema.plugin(require('mongoose-autopopulate'))

module.exports = mongoose.model('Cart', CartSchema,'carts');