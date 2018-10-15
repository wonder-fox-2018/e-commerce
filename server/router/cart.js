var express = require('express');
var router = express.Router();
var Cart=require('../model/cart')
var Transaction=require('../model/transaction')
const {isValidProduct} = require('../middleware/isProduct')
const {auth}=require('../middleware/auth.js')

router.post('/:id',isValidProduct,auth,function(req,res){
    console.log(req.decoded)
    Cart.findOne({product:req.params.id,user:req.decoded.id})
        .then((data) => {
            if(data==null){
                let newBuy = {
                    product: req.params.id,
                    quantity: 1,
                    user:req.decoded.id
                }
            
                Cart.create(newBuy)
                    .then((data) => {
                        res.status(201).json(data)
                    })
                    .catch(err => {
                        res.status(500).json({error: err.message})
                   })
            }
            else{
                
                var newQuantity=data.quantity+1
                
                Cart.findOneAndUpdate({product: req.params.id,user:req.decoded.id}, {quantity:newQuantity}, {new: true}).populate('product').populate('user')
                    .then((data) => {
                        res.status(200).json(data)
                    })
                    .catch(err => {
                        res.status(500).json({error: err.message})
                    })
            }
        })
        .catch(err => {
            res.status(500).json({error: err.message})
        })
})

router.post('/min/:id',isValidProduct,auth,function(req,res){ 

    Cart.findOne({product:req.params.id,user:req.decoded.id})
        .then((data) => {
            if(data==null){
                res.status(400).json('barang yang anda cari belum ada')
            }
            else{
                var newQuantity=data.quantity-1
                if(newQuantity>0){
                    Cart.findOneAndUpdate({product: req.params.id,user:req.decoded.id}, {quantity:newQuantity}, {new: true}).populate('product').populate('user')
                    .then((data) => {
                        res.status(200).json(data)
                    })
                    .catch(err => {
                        res.status(500).json({error: err.message})
                    })
                }
                else{
                    Cart.deleteOne({product: req.params.id,user:req.decoded.id})
                        .then(() => {
                            res.status(200).json({message: 'Product Deleted From Cart!'})
                         })
                        .catch(err => {
                            res.status(500).json({error: err.message})
                        })
                }       
            }
                
        })
        .catch(err => {
            res.status(500).json({error: err.message})
        })
})


router.get('/',auth,function(req,res){
    Cart.find({user:req.decoded.id}).populate('product').populate('user')
        .then(data => {
            res.status(200).json(data)
        })
        .catch(err => {
            res.status(500).json({error: err.message})
        })
})

router.delete('/:id',auth,function(req,res){
    Cart.deleteOne({product: req.params.id,user:req.decoded.id})
    .then(() => {
        res.status(200).json({message: 'Cart deleted!'})
    })
    .catch(err => {
        res.status(500).json({error: err.message})
    })
})

router.delete('/transactions/:id',function(req,res){
    
    Transaction.deleteOne({_id: req.params.id})
    .then(() => {
        res.status(200).json({message: 'Transaction deleted!'})
    })
    .catch(err => {
        res.status(500).json({error: err.message})
    })
})

router.get('/transaction',auth,function(req,res){
    
    Transaction.find({user:req.decoded.id}).populate('product').then(data=>{
        res.status(200).json(data)
    }).catch(err=>{
        res.status(500).json(err)
    })
})

router.get('/transaction/:id',auth,function(req,res){
    
        Transaction.findOne({_id:req.params.id,user:req.decoded.id}).populate('product').then(data=>{
        res.status(200).json(data)
    }).catch(err=>{
        res.status(500).json(err)
    })
})

router.delete('/transaction/checkout',auth,function(req,res){
    
    Cart.find({user:req.decoded.id})
    .then(data=>{
        console.log(data)
        if(data.length!=0){
            let product=[]
            let quantity=[]
            for(var i=0;i<data.length;i++){
                product.push(data[i].product)
                quantity.push(data[i].quantity)
            }
            
            Transaction.create({product:product,quantity:quantity,user:req.decoded.id})
                .then((data) => {
                    Cart.remove({})
                        .then((data)=>{
                            res.status(200).json('transaction success , data updated')    
                         })
                        .catch((err)=>{
                            res.status(500).json(err)
                         })
                 })
                .catch(err=>{
                        res.send(err)
                })
        }
        else{
            res.status(500).json('data cart kosong')
        }
    }).catch(err=>{
        res.status(500).json(err)
    })
    
})

module.exports=router