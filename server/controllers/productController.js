const Product = require("../models/product");
const Market = require("../models/market");
const Category = require("../models/category");

module.exports = {
  findAll: function(req, res) {
    Product.find()
      .populate("category", "name")
      .populate("market", "name")
      .then(products => {
        res.status(200).json({
          products
        });
      })
      .catch(err => {
        res.status(404).json({
          err,
          message: `product not found`
        });
      });
  },

  findByCategory: function(req, res) {
    Product.find({ category: req.params.id })
      .populate("category")
      .populate("market", "name")
      .then(products => {
        res.status(200).json({ products });
      })
      .catch(err => {
        res.status(404).json({ err, message: `Product not found` });
      });
  },

  findByName: function(req, res) {
    Product.find({ name: new RegExp(req.query.product, "i") })
      .populate("category", "name")
      .populate("market", "name")
      .then(products => {
        res.status(200).json({
          products
        });
      })
      .catch(err => {
        res.status(404).json({
          err,
          message: `product not found`
        });
      });
  },

  create: function(req, res) {
    let dataProduct = new Product({
      name: req.body.name,
      description: req.body.description,
      picture: req.body.picture,
      price: req.body.price,
      stock: req.body.stock,
      category: req.body.category,
      market: req.marketId
    });

    dataProduct
      .save()
      .then(product => {
        Market.update(
          { _id: req.marketId },
          { $push: { products: product._id } }
        )
          .then(() => {})
          .catch(() => {});

        res.status(200).json({
          product,
          message: `create ${product.name} success`
        });
      })
      .catch(err => {
        res.status(500).json({
          err
        });
      });
  },

  update: function(req, res) {
    Product.update(
      { _id: req.params.id },
      {
        name: req.body.name,
        description: req.body.description,
        category: req.body.category,
        stock: req.body.stock,
        price: req.body.price
      }
    )
      .then(product => {
        res.status(200).json({
          message: `update product ${req.body.name} success`
        });
      })
      .catch(err => {
        res.status(500).json({
          message: `update product ${req.body.name} failed`
        });
      });
  },

  remove: function(req, res) {
    Product.findByIdAndRemove(req.params.id)
      .then(product => {
        res.status(200).json({
          message: `Delete product success`
        });
      })
      .catch(err => {
        res.status(500).json({
          message: `Delete product failed`
        });
      });
  }
};
