const Product = require('../models/product')
const Category = require('../models/category')

class productController{

    static addCategory(req, res){
        Category.create({
            name : req.body.name
        })
        .then(tag => {
            res.status(200).json({
                message : 'Category created',
                tag
            })
        })
        .catch(err => {
            res.status(500).json({
                message : err.message
            })
        })
    }
    static updateCategory(req, res){
        Category.update({_id : req.params.id},{
            name : req.body.name
        })
        .then(tag =>{
            res.status(200).json({
                message : 'Update Category Success',
                tag
            })
        })
        .catch(err => {
            message : err.message
        })
    }

    static addProduct(req, res){
        Product.create({
            title : req.body.title,
            price : req.body.price,
            quantity : req.body.qty,
            img : req.body.img,
            description : req.body.description,
            total : req.body.total,
            admin : req.login.id
        })
        .then(product => {
            res.status(200).json({
                message : 'Product created',
                product
            })
        })
        .catch(err => {
            res.status(500).json({
                message : err.message
            })
        })

    }

    static showAll(req,res){
        Product.find().populate('admin').exec()
        .then(products => {
            res.status(200).json({products})
        })
        .catch(err => {
            res.status(500).json({
                message : err.message
            })
        })

    }

    static showAllCategory(req, res){
        Category.find()
        .then(categories => {
            res.status(200).json(categories)
        })
        .catch(err => {
            res.status(500).json({
                message : err.message
            })
        })
    }

    static updateProduct(req, res){
        Product.update({_id : req.params.id},{
            title : req.body.title,
            price : req.body.price,
            quantity : req.body.quantity,
            img : req.body.img,
            description : req.body.description,
        })
        .then(product => {
            res.status(200).json({
                message : 'Update Success',
                product
            })
        })
        .catch(err => {
            res.status(500).json({
                message : err.message
            })
        })

    }
    
    static deleteProduct(req, res){
        Product.findOneAndDelete({_id : req.params.id})
        .then(product => {
            res.status(200).json({
                message : 'Product has been deleted',
                product
            })
        })
        .catch(err => {
            res.status(500).json({
                message : err.message
            })
        })
    }
    static deleteCategory(req, res){
        Category.findOneAndDelete({_id : req.params.id})
        .then(category => {
            res.status(200).json({
                message : 'Category has been deleted',
                category
            })
        })
    }
    static upload(req, res){
        res.send({
            status: 200,
            message: 'Your file is successfully uploaded',
            link: req.file.cloudStoragePublicUrl
        })
    }
    
}

module.exports = productController