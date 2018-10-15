const Item = require('../models/itemModel.js');

class ItemController {
    static add(req, res) {
        Item.create({
            name: req.body.name,
            price: req.body.price,
            stock: req.body.stock,
            imgURL: req.body.imgURL
        })
            .then(function(item) {
                res.status(200).json({
                    item: item,
                    message: 'Successfully created an item'
                });
            })
            .catch(function(err) {
                res.status(500).json(err.message);
            });
    }

    static showAll(req, res) {
        Item.find()
            .then(function(items) {
                res.status(200).json(items);
            })
            .catch(function(err) {
                res.status(500).json(err.message);
            });
    }

    static findWithId(req, res) {
        Item.findById(req.params.id)
            .then(function(item) {
                res.status(200).json(item);
            })
            .catch(function(err) {
                res.status(500).json(err.message);
            });
    }

    static update(req, res) {
        Item.updateOne({_id: req.params.id}, {
            name: req.body.name,
            price: req.body.price,
            stock: req.body.stock,
            imgURL: req.body.imgURL
        })
            .then(function(result) {
                res.status(200).json(result);
            })
            .catch(function(err) {
                res.status(500).json(err.message);
            });
    }

    static delete(req, res) {
        Item.findByIdAndDelete(req.params.id)
            .then(function(result) {
                res.status(200).json(result);
            })
            .catch(function(err) {
                res.status(500).json(err.message);
            });
    }

    static searchByName(req, res) {
        Item.find({name: new RegExp(req.params.keyword, 'i')})
            .then(function(items) {
                res.status(200).json(items);
            })
            .catch(function(err) {
                res.status(500).json(err.message); 
            });
    }
}

module.exports = ItemController;