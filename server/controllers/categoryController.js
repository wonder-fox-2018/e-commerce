'use strict'

const ModelCategory = require('../models/categoryModel');
const ModelItem = require('../models/itemModel');

class CategoryController {
    static createCategory(req,res){
        console.log('Add categiry')
        console.log(req.body.category)
        ModelCategory.create({name : req.body.name})
        .then(result =>{
            res.status(200).json({data:result});
        })
        .catch(err =>{
            res.status(500).json({ msg : err });
        })
    }

    static getAllCategory(req,res){ //get category dan list item pada category pertama
        console.log('get category')
        //ModelCategory.find({}).populate('itemlist')
        ModelCategory.find({})
        .then(dataCategory =>{
            if(dataCategory){
                console.log(dataCategory[0]._id)
                ModelItem.find({category:dataCategory[0]._id})
                .then(dataItem=>{
                    console.log(dataItem)
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
            {
                res.status(200).json({ 
                    data:null
                })
            }
           
        })
        .catch(err =>{
            console.log(err)
            res.status(500).json({
                msg : err
            })
        })
    }

    static getCategoryByName(req,res){
        ModelCategory.findOne({
            name : req.body.name
        }).populate('itemlist')
            .then(result =>{
                res.status(200).json({ 
                    data : result
                })
            })
            .catch(err =>{
                res.status(500).json({
                    msg : err
                })
            })
    }


    static editCategory(req,res){
        ModelCategory.findOneAndUpdate({_id : req.params.id},{
            name : req.body.name,
            groupItem : req.body['groupItem']
        })
        .then(row =>{
            res.status(200).json({ msg : 'Category updated'});
        })
        .catch(err =>{
            res.status(500).json({ msg : err});
        })
    }


    static deleteCategory(req,res){
        ModelCategory.deleteOne({ _id : req.params.id})
            .then(row =>{
                res.status(200).json({ msg : 'Category deleted'});
            })
            .catch(err =>{
                res.status(500).json({ msg : err})
            })
    }
}

module.exports = CategoryController