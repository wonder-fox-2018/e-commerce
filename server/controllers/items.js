const Item = require('../models/items')


module.exports = {

    add: function(req, res){ 
        Item.create({
            name: req.body.name,
            price: req.body.price,
            category: req.body.category,
            urlImage: req.file.cloudStoragePublicUrl
        })
        .then((result) => {
            res.status(201).json({message: "Item added"})
        }).catch((err) => {
            res.status(500).json({message: err.message})
        });
    },
    show: function(req, res){
        Item.find()
        .then((result) => {
            res.status(200).json({data: result})
        }).catch((err) => {
            res.status(500).json({message: err.message})
        });
    },
    edit: function(req, res){
        Item.update({
            _id: req.body.id
        }, {
            name: req.body.name,
            price: req.body.price,
            category: req.body.category
        })
        .then((result) => {
            res.status(200).json({message: "Item Updated"})
        }).catch((err) => {
            res.status(500).json({message: err.message})
        });
    },
    remove: function(req, res){
        Item.deleteOne({
            _id: req.params.id
        })
        .then((result) => {
            res.status(200).json({message: "Item Deleted"})
        }).catch((err) => {
            res.status(500).json({message: err.message})
        });
    },
    find: function(req, res){
        Item.findById({
            _id: req.params.id
        })
        .then((result) => {
            res.status(200).json({data: result})
        }).catch((err) => {
            res.status(500).json({message: err.message})
        });
    },
    getItemByCategory(req, res){
        Item.find({
            category: req.params.id
        })
        .populate('category','name')
        .then((result) => {
            res.status(200).json({datas: result})
        }).catch((err) => {
            res.status(500).json({message: err.message})
        });
    },
    search(req, res){
        var regexQuery = {
            name: new RegExp(req.params.q, 'i')
        }
        Item.find(regexQuery)
        .then((result) => {
            res.status(200).json({result})
        }).catch((err) => {
            res.status(500).json({err})
        });
    },
    editWithImage(req, res){
        Item.update({
            _id: req.body.id
        }, {
            name: req.body.name,
            price: req.body.price,
            category: req.body.category,
            urlImage: req.file.cloudStoragePublicUrl
        })
        .then((result) => {
            res.status(200).json({message: "Item Updated"})
        }).catch((err) => {
            res.status(500).json({message: err.message})
        });
    }   
}