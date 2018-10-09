var express = require('express');
var router = express.Router();
var Cart=require('../model/cart')
var Transaction=require('../model/transaction')
const {isValidProduct} = require('../middleware/isProduct')

router.post('/:id',isValidProduct,function(req,res){     
    Cart.findOne({product:req.params.id})
        .then((data) => {
            if(data==null){
                let newBuy = {
                    product: req.params.id,
                    quantity: 1,
                    user:req.body.user
                }
            
                Cart.create(newBuy)
                    .then((data) => {
                        res.status(201).json({message: 'List Item created!'})
                    })
                    .catch(err => {
                        res.status(500).json({error: err.message})
                   })
            }
            else{
                
                var newQuantity=data.quantity+1
                console.log(newQuantity)
                
                Cart.findOneAndUpdate({product: req.params.id}, {quantity:newQuantity})
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

router.post('/min/:id',isValidProduct,function(req,res){ 
    Cart.findOne({product:req.params.id})
        .then((data) => {
            if(data==null){
                res.status(400).json('barang yang anda cari belum ada')
            }
            else{
                var newQuantity=data.quantity-1
                if(newQuantity>=0){
                    Cart.findOneAndUpdate({product: req.params.id}, {quantity:newQuantity})
                    .then((data) => {
                        res.status(200).json(data)
                    })
                    .catch(err => {
                        res.status(500).json({error: err.message})
                    })
                }
                else{
                    Cart.deleteOne({product: req.params.id})
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


router.get('/',function(req,res){
    Cart.find().populate('product').populate('user')
        .then(data => {
            res.status(200).json(data)
        })
        .catch(err => {
            res.status(500).json({error: err.message})
        })
})

router.delete('/',function(req,res){
    Cart.deleteOne({product: req.body.id})
    .then(() => {
        res.status(200).json({message: 'Cart deleted!'})
    })
    .catch(err => {
        res.status(500).json({error: err.message})
    })
})

router.get('/transaction',function(req,res){
    // Transaction.remove({}).then(()=>{
    //     res.status(200).json('success delete data')
    // })

    Transaction.find({}).populate('product').then(data=>{
        res.status(200).json(data)
    }).catch(err=>{
        res.status(500).json(err)
    })
})

router.delete('/checkout',function(req,res){
    Cart.find({})
    .then(data=>{
        console.log(data)
        if(data.length!=0){
            let product=[]
            let quantity=[]
            for(var i=0;i<data.length;i++){
                product.push(data[i].product)
                quantity.push(data[i].quantity)
            }
            
    
            Transaction.create({product:product,quantity:quantity})
                .then((data) => {
                    Cart.remove({user:'5bbc6a029f33133cec11ced2'})
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