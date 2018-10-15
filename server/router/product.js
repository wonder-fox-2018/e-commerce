var express = require('express');
var router = express.Router();
var Product=require('../model/product')
var Cart=require('../model/cart')
const {auth}=require('../middleware/auth.js')
const {isAdmin}=require('../middleware/isAdmin.js')

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

router.put('/:id',function(req,res){
    let newProduct = {
        name: req.body.name,
        description: req.body.description,
        imgUrl:req.body.imgUrl,
        stock:req.body.stock,
        price:req.body.price,
        category:req.body.category
    }

    Product.findOneAndUpdate({_id: req.params.id},newProduct, {new: true})
        .then((data) => {
            res.status(200).json(data)
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

router.get('/:id',function(req,res){
    Product.find({category:req.params.id}).populate('category')
            .then(data => {
                res.status(200).json(data)
            })
            .catch(err => {
                res.status(500).json({error: err.message})
            })
})

router.get('/search/:keyword',function(req,res){
    Product.find({name: new RegExp(req.params.keyword, 'i')})
            .then(data => {
                res.status(200).json(data)
            })
            .catch(err => {
                res.status(500).json({error: err.message})
            })
 })

router.get('/item/:id',function(req,res){
    Product.find({_id:req.params.id}).populate('category')
            .then(data => {
                res.status(200).json(data)
            })
            .catch(err => {
                res.status(500).json({error: err.message})
            })
})

router.delete('/:id',function(req,res){
    Product.deleteOne({_id: req.params.id})
    .then(() => {
        Cart.remove({product:req.params.id})
        .then(()=>{
            res.status(200).json({message: 'Product deleted!'})
        })
        .catch(err=>{
            res.status(500).json({error: err.message})    
        })
    })
    .catch(err => {
        res.status(500).json({error: err.message})
    })
})

module.exports=router