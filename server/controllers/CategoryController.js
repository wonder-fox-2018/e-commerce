'use strict'

const Category = require('../models/category')

class CategoryController{
    // create category
    static createCategory(req,res){
        Category.create({
            name: req.body.name
        })
          .then(category=>{
              res.status(200).json({
                  msg: 'Category has been created',
                  data: category
              })
          })
          .catch(error => {
              res.status(500).json({
                msg: 'ERROR Category create ',error
              })
          })
    }

    // edit category ---> only updating name
    static editCategory(req,res){
        Category.findOne({
            _id: req.params.id
        })
          .then(category => {
            category.name = req.body.name
            res.status(200).json({
                msg: 'Category has been updated',
                data: category
            })
          })
          .catch(error => {
              res.status(500).json({
                msg: 'ERROR Category update ',error
              }) 
          }) 
    }

    // display detail category
    static displayCategory(req,res){
        Category.findOne({
            _id: req.params.id
        }).populate('listitemcategory')
          .then(category => {
            res.status(200).json({
                msg: 'Detail of Category',
                data: category
            })
          })
          .catch(error => {
            res.status(500).json({
              msg: 'ERROR Category detail ',error
            }) 
          })
    }

    // display all category
    static displayListCategory(req,res){
        Category.find({})
         .then(categories => {
            res.status(200).json({
               msg: 'List of categories',
               data: categories
            })
         })
         .catch(error => {
            res.status(500).json({
               msg: 'ERROR List of Categories ',error
            })
         })
    }

    // delete category
    static deleteCategory(req,res){
        Category.findOne({
            _id: req.params.id
        })
          .then(category => {
            
            if(category.listitemcategory === [] || category.listitemcategory === null){
              Category.findOneAndRemove({ _id: req.params.id})
               .then(categorydelete =>{
                  res.status(200).json({
                    msg: 'Category has been deleted',
                    data: categorydelete
                  })
               })
               .catch(error => {
                  res.status(500).json({
                    msg: 'ERROR delete category ',error
                   })
               })
            }else if(category.listitemcategory === [] || category.listitemcategory === null){
                res.status(500).json({
                    msg: 'Please Delete Items in the category first'
                })
            }
          })
          .catch(error => {
              res.status(500).json({
                  msg: 'ERROR Delete Category ',error
              })
          })
    }


}

module.exports = CategoryController