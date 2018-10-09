var express = require('express');
var router = express.Router();
var Product=require('../model/product')

router.post('/',function(req,res){
    let newProduct = {
        name: req.body.name,
        description: req.body.description,
        imgUrl:req.body.imgUrl,
        stock:req.body.stock,
        price:req.body.price,
        category:req.body.category
    }

    Product.create(newProduct)
        .then((data) => {
            res.status(201).json({message: 'Category created!'})
        })
        .catch(err => {
            res.status(500).json({error: err.message})
        })
})

router.get('/',function(req,res){
    Product.find().populate('category')
            .then(data => {
                res.status(200).json(data)
            })
            .catch(err => {
                res.status(500).json({error: err.message})
            })
})

router.delete('/',function(req,res){
    Product.deleteOne({_id: req.body.id})
    .then(() => {
        res.status(200).json({message: 'Product deleted!'})
    })
    .catch(err => {
        res.status(500).json({error: err.message})
    })
})

module.exports=router