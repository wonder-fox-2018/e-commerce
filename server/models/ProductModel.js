var mongoose = require('mongoose');
var Schema   = mongoose.Schema;

var ProductSchema = new Schema({
	'productName' : String,
	'productDec' : String,
	'price' : Number,
	'rating' : Number,
	'category' : {
	 	type: Schema.Types.ObjectId,
		 ref: 'Category',
		 autopopulate : true
	}
});

ProductSchema.plugin(require('mongoose-autopopulate'))

module.exports = mongoose.model('Product', ProductSchema,'products');
