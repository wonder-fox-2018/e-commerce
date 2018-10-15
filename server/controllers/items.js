const Item = require('../models/items'),
      ObjectId = require('mongodb').ObjectId;

module.exports = {

    list: (req, res) => {
        Item.find({
            stock: { $gt: 0 }
        }, (err, items) => {
            if (!err) {
                res.status(200).json({
                    items: items
                })
            } else {
                res.status(500).json({
                    message: err.message
                })
            }
        })
    },

    findByCat: (req, res) => {
        Item.find({
            stock: { $gt: 0 },
            category: req.params.catid
        }, (err, categories) => {
            if (!err) {
                res.status(200).json({
                    categories: categories
                })
            } else {
                res.status(500).json({
                    message: err.message
                })
            }
        })
    },

    findById: (req, res) => {
        Item.findOne({
            stock: { $gt: 0 },
            _id: ObjectId(req.params.id)
        }, (err, item) => {
            if (!err) {
                res.status(200).json({
                    item: item
                })
            } else {
                res.status(500).json({
                    message: err.message
                })
            }
        })
    },

    insert: (req, res) => {
        Item.create({
            name: req.body.name,
            desc: req.body.desc,
            imageurl: req.body.imageurl,
            price: req.body.price,
            stock: req.body.stock,
            category: req.body.category
        }, function (err) {
            if (!err) {
                console.log(typeof req.body.imageurl)
                res.status(200).json({
                    message: `succesfully added item: ${req.body.name}`
                })
            } else {
                res.status(500).json({
                    message: err.message
                })
            }
        })
    },

    update: (req, res) => {  
        const upd = {
            name: req.body.name,
            desc: req.body.desc,
            imageurl: req.body.imageurl,
            price: req.body.price,
            stock: req.body.stock,
            category: req.body.category
        }

        Item.updateOne({
            _id: ObjectId(req.params.id)
        }, upd, function(err) {
            if (!err) {
                res.status(200).json({
                    message: `succesfully updated item: ${req.body.name}`
                })
            } else {
                res.status(500).json({
                    message: err.message
                })
            }
        })
    },

    remove: (req, res) => {
        Item.deleteOne({
            _id: ObjectId(req.params.id)
        }, function(err) {
            if (!err) {
                res.status(200).json({
                    message: `succesfully deleted item`
                })
            } else {
                res.status(500).json({
                    message: err.message
                })
            }
        })
    }
}