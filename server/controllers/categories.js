const Category = require('../models/categoryModel')
const Product = require('../models/productModel')

module.exports = {
    
    show: function (req, res) {
        Category.find({})
        .then(data => {
            res.status(200).json(data)
        })
        .catch(err => {
            res.status(500).json({error: err})
        })
    },

    add: function (req, res) {
        Category.create({
            name: req.body.name,
            icon: req.body.icon,
        })
        .then(() => {
            res.status(201).json({message: 'New category added.'})
        })
        .catch(err => {
            res.status(500).json({error: err})
        })
    },

    edit: function (req, res) {
        Category.updateOne({
            _id: req.params.id
        }, {
            name: req.body.name,
            icon: req.body.icon,
        })
        .then(() => {
            res.status(200).json({message: `Category '${req.params.id}' updated.`})
        })
        .catch(err => {
            res.status(500).json({error: err})
        })
    },

    remove: function (req, res) {
        Category.deleteOne({
            _id: req.params.id
        })
        .then(() => {
            Product.deleteMany({
                category: req.params.id
            })
            .then(() => {
                res.status(200).json({message: `Category '${req.params.id}' deleted.`})
            })
            .catch(err => {
                res.status(500).json({error: err})
            })
        })
        .catch(err => {
            res.status(500).json({error: err})
        })
    }
}