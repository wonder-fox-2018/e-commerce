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
            itemwebsitelink: req.body.itemwebsitelink
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
}

module.exports = ItemController