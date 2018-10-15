'use strict'

const ModelCart = require('../models/cartModel');
const mongoose = require('mongoose');
const ObjectId = mongoose.Types.ObjectId;
class CardController {
    static getCarts(req, res) {    
        ModelCart.findOne({ iduser: req.currentUser._id }).populate('itemlist.iditem')
        .then((dataCart) => {
            res.status(201).json({ data: dataCart})
        }).catch((err) => {
            res.status(500).json({ msg : err});
        }); 
    }

    static createCart(req, res) {
        console.log('create cart')
        //CardController.coba(req,res)
        ModelCart.find({
                iduser: req.currentUser._id
        })
        .then((result) => {
            console.log('find user cart')
            if (result.length>0) {
                //update cart
                console.log('ketemu.... user');
                ModelCart.findOneAndUpdate({                      
                    iduser: req.currentUser._id,
                    "itemlist.iditem": ObjectId(req.body.id)
                    },
                    { 
                        $inc: { "itemlist.$.qty": 1 } //quatity +1
                    }
                )
                .then(updateCart => { 
                    if (updateCart)//null jika tidak ditemukan itemnya maka $push item
                        CardController.getCarts(req,res)
                        //res.status(201).json({data: updateCart});
                    else {
                        ModelCart.findOneAndUpdate({
                                iduser: req.currentUser._id
                            }, 
                            {
                                $push: {
                                    itemlist: {
                                        "iditem": req.body.id,
                                        "qty" : 1,
                                        "price": req.body.price                                             
                                    }
                                }
                            })
                        .then((addCart) => {
                            CardController.getCarts(req,res)
                            //res.status(201).json({ data: addCart })    
                        }).catch((err) => {
                            res.status(500).json({ msg: err });

                        });
                    }
                })
                .catch(err => {
                    console.log(err)
                    res.status(500).json({
                        msg: err
                    });
                })
            } else {
                //create cart       
                // let dataCart = new ModelCart({
                //     iduser : req.currentUser._id,               
                // })     
                // dataCart.itemlist.push({
                //     "iditem": req.body.id,
                //     "qty" : 1,
                //     "price": req.body.price 
                // })  
                // dataCart.save()  
                let objCart = {
                    "iditem": req.body.id,
                    "qty" : 1,
                    "price": req.body.price 
                }        
                ModelCart.create({
                        iduser: req.currentUser._id,                     
                        itemlist: [objCart]                       
                    })
                
                .then(result => {
                    CardController.getCarts(req,res)
                })
                .catch(err => {
                    console.log(err)
                    res.status(500).json({ msg: err }); 
                })
            }

        }).catch((err) => {
            console.log(err)
            res.status(500).json({ msg: err });             
        });
    }
    static deleteCartItem(req, res) {
             
        ModelCart.findOneAndUpdate( 
            { iduser: req.currentUser._id, "itemlist.iditem": ObjectId(req.body.id) }, 
            { $pull: { itemlist: {iditem: req.body.id }}}
        )
        .then(result =>{
            CardController.getCarts(req,res)
            //res.status(201).json({ data : result})
        })
        .catch(err =>{
            res.status(500).json({ msg : err})
        })    
    }

}

module.exports = CardController