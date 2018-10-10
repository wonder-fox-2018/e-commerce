var ProductModel = require('../models/ProductModel.js');

/**
 * ProductController.js
 *
 * @description :: Server-side logic for managing Products.
 */
module.exports = {

    /**
     * ProductController.list()
     */
    list: function (req, res) {
        ProductModel.find(function (err, Products) {
            if (err) {
                return res.status(500).json({
                    message: 'Error when getting Product.',
                    error: err
                });
            }
            return res.json(Products);
        });
    },

    /**
     * ProductController.show()
     */
    show: function (req, res) {
        var id = req.params.id;
        ProductModel.findOne({_id: id}, function (err, Product) {
            if (err) {
                return res.status(500).json({
                    message: 'Error when getting Product.',
                    error: err
                });
            }
            if (!Product) {
                return res.status(404).json({
                    message: 'No such Product'
                });
            }
            return res.json(Product);
        });
    },

    /**
     * ProductController.create()
     */
    create: function (req, res) {
        var Product = new ProductModel({
			productName : req.body.productName,
			productDec : req.body.productDec,
			price : req.body.price,
			rating : req.body.rating,
			category : req.body.category

        });

        Product.save(function (err, Product) {
            if (err) {
                return res.status(500).json({
                    message: 'Error when creating Product',
                    error: err
                });
            }
            return res.status(201).json(Product);
        });
    },

    /**
     * ProductController.update()
     */
    update: function (req, res) {
        var id = req.params.id;
        ProductModel.findOne({_id: id}, function (err, Product) {
            if (err) {
                return res.status(500).json({
                    message: 'Error when getting Product',
                    error: err
                });
            }
            if (!Product) {
                return res.status(404).json({
                    message: 'No such Product'
                });
            }

            Product.productName = req.body.productName ? req.body.productName : Product.productName;
			Product.productDec = req.body.productDec ? req.body.productDec : Product.productDec;
			Product.price = req.body.price ? req.body.price : Product.price;
			Product.rating = req.body.rating ? req.body.rating : Product.rating;
			Product.category = req.body.category ? req.body.category : Product.category;
			
            Product.save(function (err, Product) {
                if (err) {
                    return res.status(500).json({
                        message: 'Error when updating Product.',
                        error: err
                    });
                }

                return res.json(Product);
            });
        });
    },

    /**
     * ProductController.remove()
     */
    remove: function (req, res) {
        var id = req.params.id;
        ProductModel.findByIdAndRemove(id, function (err, Product) {
            if (err) {
                return res.status(500).json({
                    message: 'Error when deleting the Product.',
                    error: err
                });
            }
            return res.status(204).json();
        });
    }
};
