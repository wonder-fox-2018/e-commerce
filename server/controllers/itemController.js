const Item = require('../models/item')

class Controller {
    static create(req, res) {

        let newItem = new Item({
            name: req.body.name,
            description: req.body.description,
            price: req.body.price,
            img : req.body.img,
            category: req.body.categoryId,
            stock : req.body.stock
        })

        newItem.save()
            .then(function () {
                res.status(200).json({
                    message: `add item success`
                })
            })
            .catch(function () {
                res.status(500).json({
                    message: `add item failed`
                })
            })
    }

    static read(req, res) {
        Item.find()
            .populate('category')
            .then(function (items) {
                res.status(200).json({
                    items
                })
            })
    }

    static edit(req,res){
        Item.findById({
            _id: req.params.id
        })
        .then(function (item) {
            console.log(item)
            res.status(201).json(item)
        })
        .catch(function (err) {
            res.status(500).json({
                err
            })
        })
    }

    static update(req,res){
        Item.findOneAndUpdate({
            _id: req.params.id
        }, {
            name: req.body.name,
            description: req.body.description,
            price: req.body.price,
            img: req.body.img,
            stock : req.body.stock,
            category : req.body.category
        })
        .then(function (item) {
            res.status(200).json({
                message: `update ${item.name} success`
            })
        })
        .catch(function (err) {
            res.status(500).json({
                err
            })
        })
    }

    static delete(req,res){
        Item.findOneAndDelete({
            _id: req.params.id
        })
        .then(function (item) {
            res.status(200).json({
                message: `${item.name} removed..`
            })
        })
        .catch(function (err) {
            res.status(500).json({
                message : err
            })
        })
    }
}

module.exports = Controller;