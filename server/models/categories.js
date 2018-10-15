const mongoose = require('mongoose'),
    Schema = mongoose.Schema;

const categoryScheme = new Schema({
    name: {
        type: String,
        required: true,
        unique: true
    },
    class: String
}, {
    timestamps: true
});

const Category = mongoose.model('Category', categoryScheme)
module.exports = Category