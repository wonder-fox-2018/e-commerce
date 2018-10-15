'use strict'

const ModelCategory = require('../models/categoryModel');
const ModelItem = require('../models/itemModel');

class CategoryController {
    static getCategory(req,res){
        ModelCategory.find({})
        .then(result =>{
            res.status(200).json({data:result});
        })
        .catch(err =>{
            res.status(500).json({ msg : err });
        })
    }
    static createCategory(req,res){
        ModelCategory.create({name : req.body.name})
        .then(result =>{
            CategoryController.getCategory(req,res)
            //res.status(200).json({ msg : 'Category updated'});
        })
        .catch(err =>{
            res.status(500).json({ msg : err });
        })
    }  
    static getCategoryAndFirstItemCategory(req,res){ //get category dan list item pada category pertama
        console.log('get category')
        ModelCategory.find({})
        .then(dataCategory =>{
            if(dataCategory){
                ModelItem.find({category:dataCategory[0]._id})
                .then(dataItem=>{
                    res.status(200).json({ 
                        data:dataCategory,
                        item:dataItem
                    }) 
                })
                .catch(err=>{
                    console.log(err)
                    res.status(500).json({ msg : err })
                })
            }else
                res.status(200).json({ data:null})
                   
        })
        .catch(err =>{
            console.log(err)
            res.status(500).json({ msg : err })
        })
    }
    static getCategoryByName(req,res){
        ModelCategory.findOne({name : req.body.name})
        .then(result =>{
            res.status(200).json({ 
                data : result
            })
        })
        .catch(err =>{
            res.status(500).json({ msg : err })
        })
    }
    static editCategory(req,res){
        console.log(req.body.id);
        console.log(req.body.name);
        ModelCategory.findOneAndUpdate({_id : req.body.id},{
            name : req.body.name,
        })
        .then(result =>{
            if(result)
                res.status(201).json({ msg : 'Category updated'});
            else
                res.status(201).json({ msg : 'Category not found'});
        })
        .catch(err =>{
            res.status(500).json({ msg : err});
        })
    }
    static deleteCategory(req,res){
        ModelCategory.deleteOne({ _id : req.body.id})
        .then(result =>{
            if(result)
                res.status(201).json({ msg : 'Category deleted'});
            else
                res.status(201).json({ msg : 'Category not found'});
        })
        .catch(err =>{
            res.status(500).json({ msg : err})
        })
    }
}

module.exports = CategoryController