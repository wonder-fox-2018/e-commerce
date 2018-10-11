const mongoose = require('mongoose'),
      Schema = mongoose.Schema;

const categorySchema = new Schema({
    name: String,
    list: [{
        type: Shema.Types.ObjectId, 
        ref: 'Item'
    }]
},{
    timestamps: true
})

const Category = mongoose.model('Category', categorySchema)
module.exports = Category


