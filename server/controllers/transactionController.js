'use strict'

const ModelTransaction = require('../models/transactionModel');
const ModelCart = require('../models/cartModel');
class TransactionController {

    static getTransaction(req,res){
        ModelTransaction.find({ iduser:req.currentUser._id}).populate('itemlist.iditem')
        .then((dataDeals) => {
            res.status(201).json({ data:dataDeals})
        }).catch((err) => {     
            res.status(500).json({ msg : err});
        });
        
    }
    static createTransaction(req, res) {    
        console.log('masukkkk')
        ModelCart.findOne({ iduser: req.currentUser._id })
        .then((dataCart) => {
            if(dataCart.itemlist.length>0){
                let dataTrans = new ModelTransaction({
                    iduser : req.currentUser._id,               
                })  
                dataCart.itemlist.forEach(item => {
                    dataTrans.itemlist.push({
                        "iditem": item.iditem,
                        "qty" : item.qty,
                        "price": item.price 
                    })  
                }); 
                dataTrans.save()
                .then((result) => {
                    ModelCart.findOneAndDelete({ _id:dataCart._id })
                    .then((deleteData) => {
                        TransactionController.getTransaction(req,res)
                    }).catch((err) => {
                        res.status(500).json({ msg : err});
                    });                 
                    //res.status(201).json({ data: result})
                }).catch((err) => {
                    res.status(500).json({ msg : err});
                });  
            }           
        }).catch((err) => {
            res.status(500).json({ msg : err});
        }); 
    }
    static deleteTransaction(req,res){
        ModelTransaction.findOneAndDelete({ _id:req.body.id })
        .then((result) => {
            res.status(201).json({ data:result})
        }).catch((err) => {
            res.status(500).json({ msg : err});
        });
    }

    // static deleteCartItem(req, res) {
             
    //     ModelCart.findOneAndUpdate( 
    //         { iduser: req.currentUser._id, "itemlist.iditem": ObjectId(req.body.id) }, 
    //         { $pull: { itemlist: {iditem: req.body.id }}}
    //     )
    //     .then(result =>{
    //         res.status(201).json({ data : result})
    //     })
    //     .catch(err =>{
    //         res.status(500).json({ msg : err})
    //     })    
    // }

}

module.exports = TransactionController