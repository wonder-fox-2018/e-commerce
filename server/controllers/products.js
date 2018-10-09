const Product = require('../models/productModel')
const Category = require('../models/categoryModel')

module.exports = {
    
    showAll: function (req, res) {
        Product.find({})
        .populate('category')
        .then(data => {
            res.status(200).json(data)
        })
        .catch(err => {
            res.status(500).json({error: err})
        })
    },

    showByCategory: function (req, res) {
        Category.findOne({
            name: req.params.category
        })
        .then(datum => {
            Product.find({
                category: datum._id
            })
            .populate('category')
            .then(data => {
                res.status(200).json(data)
            })
            .catch(err => {
                res.status(500).json({error: err})
            })
        })
        .catch(err => {
            res.status(500).json({error: err})
        })
    },

    add: function (req, res) {
        Category.findOne({
            name: req.body.category
        })
        .then(category => {
            if (category) {
                Product.findOne({name: req.body.name})
                .then(data => {
                    if (data) {
                        res.status(500).json({message: 'The product has been registered before.'})
                    } else {
                        Product.create({
                            name: req.body.name,
                            description: req.body.description,
                            backtext: req.body.backtext,
                            price: req.body.price,
                            category: category._id
                        })
                        .then(() => {
                            res.status(201).json({message: 'New product added.'})
                        })
                        .catch(err => {
                            res.status(500).json({error: err})
                        })
                    }
                })
                .catch(err => {
                    res.status(500).json({error: err})
                })
            } else {
                res.status(500).json({message: 'The category is unregistered.'})
            }
        })
        .catch(err => {
            res.status(500).json({error: err})
        })
    },

    edit: function (req, res) {
        Product.updateOne({
            _id: req.params.id
        }, {
            name: req.body.name,
            description: req.body.description,
            backtext: req.body.backtext,
            price: req.body.price,
            category: req.body.category
        })
        .then(() => {
            res.status(200).json({message: `Product '${req.params.id}' updated.`})
        })
        .catch(err => {
            res.status(500).json({error: err})
        })
    },

    remove: function (req, res) {
        Product.deleteOne({
            _id: req.params.id
        })
        .then(() => {
            res.status(200).json({message: `Product '${req.params.id}' deleted.`})
        })
        .catch(err => {
            res.status(500).json({error: err})
        })
    }
}