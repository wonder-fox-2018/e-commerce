'use strict'
const jwt = require('jsonwebtoken');
const HashPassword = require('../helpers/HashPassword');
const ModelUser = require('../models/userModel');
const ModelCart=require('../models/cartModel')
const ModelCategory=require('../models/categoryModel')


class UserController {

    static registerUser(req,res){
        let hash = HashPassword(req.body.password);
        console.log('register')
        ModelUser.create({
                name : req.body.name,
                password : hash,
                email : req.body.email,
                role : req.body.role
            })
            .then(result =>{
                res.status(200).json({data:result})
            })
            .catch(err =>{
                console.log(`error Create ${err}`)
                res.status(500).json({ msg : err});
            })
    }
    // user login
    static loginUser(req,res){
        console.log('login member')
        let hash = HashPassword(req.body.password)
        ModelUser.findOne({ email: req.body.email, password : hash })
        .then( result =>{
            if(result){
                const payload={
                    user_id : result._id,
                    name : result.name,
                    email : result.email,
                    role : result.role
                 };   
                jwt.sign(payload,process.env.SECRET_KEY,(error,token)=>{  
                    if(error){
                        res.status(401).json({ msg : 'Invalid jwttoken' })
                    }else{
                        ModelCart.findOne({ iduser: result._id }).populate('itemlist.iditem')
                        .then((dataCart) => {
                            //const coba=dataCart.getIduser();
                            //console.log(coba)
                            res.status(200).json({ 
                                msg : 'Login success',
                                dataCart: dataCart,
                                token : token
                            })
                        }).catch((err) => {
                            res.status(500).json({ msg : err});
                        });                       
                    }
                })
            }else{
                res.status(401).json({ msg : 'Invalid email or password'})
            }
        })
        .catch (err =>{
            res.status(500).json({ msg : err});
        })
    }
    static loginAdmin(req,res){
        console.log('login admin')
        let hash = HashPassword(req.body.password)
        ModelUser.findOne({ email: req.body.email, password : hash })
        .then( result =>{
            if(result.role=='admin'){
                const payload={
                    user_id : result._id,
                    name : result.name,
                    email : result.email,
                    role : result.role
                 };   
                jwt.sign(payload,process.env.SECRET_KEY,(error,token)=>{  
                    if(error){
                        res.status(401).json({ msg : 'Invalid jwttoken' })
                    }else{
                        ModelCategory.find({ })
                        .then((dataCategories) => {
                            res.status(200).json({ 
                                msg  : 'Login success',
                                data : dataCategories,
                                token: token
                            })
                        }).catch((err) => {
                            res.status(500).json({ msg : err});
                        });                       
                    }
                })
            }else{
                res.status(401).json({ msg : 'Invalid email or password'})
            }
        })
        .catch (err =>{
            res.status(500).json({ msg : err});
        })
    }
    // get all users
    static getAllUsers(req,res){
        console.log('get all user');     
        ModelUser.find({})
        .then(result=>{            
            res.status(200).json({ data : result })
        })
        .catch(err =>{
            res.status(500).json({ msg : err})
        })
    }
    static checkAdmin(req,res){
        ModelCategory.find({ })
        .then((dataCategories) => {
            res.status(200).json({ 
                msg  : 'Login success',
                data : dataCategories
            })
        }).catch((err) => {
            res.status(500).json({ msg : err});
        });       
    }
    
}

module.exports = UserController