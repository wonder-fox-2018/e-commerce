const Category = require('../models/categories')


module.exports = {
    add: function(req, res){        
        Category.create({
            name: req.body.name 
        })
        .then((result) => {
            res.status(201).json({message: "Category added"})
        }).catch((err) => {
            res.status(500).json({message: err.message})
        });
    },
    show: function(req, res){
        Category.find()
        .then((result) => {            
            res.status(200).json({data: result})
        }).catch((err) => {
            res.status(500).json({message: err.message})
        });
    },
    edit: function(req, res){
        Category.update({
            _id: req.body.id
        }, {
            name: req.body.name
        })
        .then((result) => {
            res.status(200).json({message: "Category Updated"})
        }).catch((err) => {
            res.status(500).json({message: err.message})
        });
    },
    remove: function(req, res){
        Category.deleteOne({
            _id: req.body.id
        })
        .then((result) => {
            res.status(200).json({message: "Category Deleted", data: result})
        }).catch((err) => {
            res.status(500).json({message: err.message})
        });
    },
    showEdit: function(req,res){        
        Category.findOne({
            _id: req.params.id
        })
        .then((result) => {                        
            res.status(200).json({result})
        }).catch((err) => {
            res.status(500).json({message: err.message})
        });
    }
}