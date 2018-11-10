const mongoose = require('mongoose')
var Schema = mongoose.Schema;


const Catschema = new Schema({
    tag: { type : String, required:true },
    listItem: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Item'
    }]    
}, {
    timestamps: true
});


module.exports = mongoose.model('Category', Catschema);