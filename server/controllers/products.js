const Product = require('../models/productModel')
const Category = require('../models/categoryModel')
const User = require('../models/userModel')

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

    search: function (req, res) {
        Product.find({
            name: new RegExp(req.query.keyword, 'i')
        })
        .populate('category')
        .then(data => {
            res.status(200).json(data)
        })
        .catch(err => {
            res.status(500).json({message: err + " --> in other words, we can't find what you want"})
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
                            image: req.body.image,
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
        Category.findOne({
            name: req.body.category
        })
        .then(category => {
            if (category) {
                Product.updateOne({
                    _id: req.params.id
                }, {
                    name: req.body.name,
                    description: req.body.description,
                    backtext: req.body.backtext,
                    price: req.body.price,
                    category: category._id
                })
                .then(() => {
                    res.status(200).json({message: `Product '${req.params.id}' updated.`})
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
    },

    rate: function (req, res) {
        User.findById(req.userId)
        .then(user => {
            if (user.boughtProducts.indexOf(req.params.id) !== -1) {
                Product.findById(req.params.id)
                .then(data => {
                    let ratedBy = data.ratedBy
                    if (ratedBy.indexOf(req.userId) === -1) {
                        let ratings = data.ratings
        
                        ratedBy.push(req.userId)
                        ratings.push(req.body.rate)
            
                        let ratingsSum = (a, b) => a + b
            
                        let rating = ratings.reduce(ratingsSum) / ratedBy.length
            
                        Product.updateOne({
                            _id: req.params.id
                        }, {
                            ratedBy: ratedBy,
                            ratings: ratings,
                            rating: rating
                        })
                        .then(() => {
                            res.status(200).json({})
                        })
                        .catch(err => {
                            res.status(500).json({message: err})
                        })
                    } else {
                        res.status(500).json({message: "You've rated the product before"})
                    }
                })
                .catch(err => {
                    res.status(500).json({message: err})
                })
            } else {
                res.status(500).json({message: "You've never bought this product, so you can't rate it"})
            }
        })
    }
}