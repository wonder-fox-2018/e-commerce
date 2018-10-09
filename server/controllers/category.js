
const Category = require('../models/category')


module.exports = {
    create : function(req,res){
      Category.create({
          listItem : req.body.listItem,
          name : req.body.name
      })
      .then(category =>{
          res.status(200).json(category)
      })
      .catch(err =>{
          res.status(400).json(err)
      })
    },
    read : function(req,res){
      Category.find({})
      .then(category =>{
          res.status(200).json(category)            
      })
      .catch(err =>{
          res.status(400).json(err)
      })     
    },
    update : function(req,res){
      Category.findOneAndUpdate({
          _id : req.body.categoryId
      },{
          listItem : req.body.listItem,
          name : req.body.name
      })
      .then(category =>{
          res.status(200).json(category)
      })
      .catch(err =>{
          res.status(400).json(err)
      })

    },
    delete : function(req,res){
      Category.findOneAndRemove({ _id : req.body.categoryId })
      .then(category =>{
          res.status(200).json({
              msg : 'success delete category'
          })
      })
      .catch(err =>{
          res.status(400).json(err)
      })
    }
}