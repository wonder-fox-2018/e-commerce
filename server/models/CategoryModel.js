var mongoose = require('mongoose');
var Schema   = mongoose.Schema;

var CategorySchema = new Schema({
	'categoryName' : String,
	'description' : String,
	'Products' : [{
	 	type: Schema.Types.ObjectId,
	 	ref: 'Product'
	}]
});

module.exports = mongoose.model('Category', CategorySchema);
