var express = require('express');
var router = express.Router();
var Category=require('../model/category')

router.post('/',function(req,res){
    let newCategory = {
        name: req.body.name,
        description: req.body.description
    }

    Category.create(newCategory)
        .then((data) => {
            res.status(201).json({message: 'Category created!'})
        })
        .catch(err => {
            res.status(500).json({error: err.message})
        })
})

router.get('/',function(req,res){
    Category.find()
            .then(data => {
                res.status(200).json(data)
            })
            .catch(err => {
                res.status(500).json({error: err.message})
            })
})

router.delete('/',function(req,res){
    Category.deleteOne({_id: req.body.id})
    .then(() => {
        res.status(200).json({message: 'Category deleted!'})
    })
    .catch(err => {
        res.status(500).json({error: err.message})
    })
})

module.exports=router