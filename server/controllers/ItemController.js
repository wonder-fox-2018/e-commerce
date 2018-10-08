'use strict'

const Item = require('../models/item')

class ItemController{
    //create item
    static createItem(req,res){
        Item.create({
            itemname: req.body.itemname,
            itembrand: req.body.itembrand,
            itemdescription: req.body.itemdescription,
            itemcategory: req.body.itemcategory,
            itemurlimage: req.body.itemurlimage,
            itemwebsitelink: req.body.itemwebsitelink,
            itemprice: Number(req.body.itemprice)
        })
          .then(item => {
              res.status(200).json({
                  msg: 'Item has been created',
                  data: item
              })
          })
          .catch(error => {
              res.status(500).json({
                  msg: 'ERROR Create Item ',error
              })
          })
    }

    // get list of items
    static getItemLists(req,res){
        Item.find({})
         .then(items=>{
            res.status(200).json({
                msg: 'List of Items',
                data: items
            })
         })
         .catch(error =>{
             res.status(500).json({
                 msg: 'ERROR List Items ',error
             })
         })
    }

    // get details
    static getDetail(req,res){
        Item.findOne({
            _id: req.params.id
        })
          .then(item=>{
            res.status(200).json({
                msg: `Detail of item ${item.itemname}`,
                data: item
            })
          })
          .catch(error =>{
            res.status(500).json({
              msg: 'ERROR Detail Items ',error
            })
          })
    }

    // edit item
    static editItem(req,res){
        Item.findOneAndUpdate({
            _id: req.params.id
        },{
            itemname: req.body.itemname,
            itembrand: req.body.itembrand,
            itemdescription: req.body.itemdescription,
            itemcategory: req.body.itemcategory,
            itemurlimage: req.body.itemurlimage,
            itemwebsitelink: req.body.itemwebsitelink,
            itemprice: Number(req.body.itemprice)
        })
          .then(item => {
            res.status(200).json({
              msg: `Item has been updated`,
              data: item
            })
          })
          .catch(error => {
            res.status(500).json({
              msg: 'ERROR Edit Items ',error
            })
          })
    }

    // delete item
    static deleteItem(req,res){
        Item.findOneAndRemove({
           _id: req.params.id
        })
         .then(item => {
            res.status(200).json({
              msg: `Item has been deleted`,
              data: item
            })
         })
         .catch(error => {
            res.status(500).json({
               msg: 'ERROR Delete Items ',error
            }) 
         })
    }
}

module.exports = ItemController