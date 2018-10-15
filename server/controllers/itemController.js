'use strict'
const ModelItem = require('../models/itemModel');
const mongoose = require('mongoose');
const ModelCategory = require('../models/categoryModel')

class ItemController {

    static getListItems(req,res){
        ModelItem.find({}).populate('category')
        .then(result =>{
            res.status(200).json({ data:result})
        })  
        .catch(err =>{
            res.status(500).json({ msg : err});
        })  
    }
    static createItem(req,res){
        console.log('add item');
        
        ModelItem.create({ 
            name : req.body.name, 
            price : req.body.price,
            picture:req.body.picture,
            category : req.body.category_id })
            .then(result =>{
                ItemController.getListItems(req,res)
                //res.status(200).json({ data:result})
            })
            .catch(err =>{
                res.status(500).json({ msg : err});
            })
    }
   
    static getListItemsbyCategory(req,res){
        console.log(req.body.id);       
        let category_id=req.body.id
        ModelItem.find({category:category_id}).populate('category')
        .then(result =>{
            res.status(200).json({ data:result})
        })  
        .catch(err =>{
            res.status(500).json({ msg : err});
        })  
    }

    static editItem(req,res){
        let editId = req.params.id;
   
        ModelItem.findOneAndUpdate({_id : editId},{
            name : req.body.name, 
            price : req.body.price,
            picture:req.body.picture,
            category : req.body.category 
        })
        .then(result => {
 
            res.status(200).json({ data:result})
        })
        .catch(err =>{
            res.status(500).json({ msg : err})
        })
    }

    static deleteItem(req,res){
        console.log(req.body.id)
        ModelItem.deleteOne({_id : req.body.id})
        .then(row =>{
            res.status(200).json({ msg : 'Item deleted'})
        })
        .catch(err =>{
            res.status(500).json({ msg : err})
        })            
    }
}

module.exports = ItemController