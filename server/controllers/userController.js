'use strict'

const ModelUser = require('../models/userModel');
const jwt = require('jsonwebtoken');
const HashPassword = require('../helpers/HashPassword');

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
                //for get _id
                res.status(200).json({data:result})
                
            })
            .catch(err =>{
                console.log(`error Create ${err}`)
                res.status(500).json({ msg : err});
            })
    }

    // user login
    static loginUser(req,res){
        console.log('login jalan')
        let hash = HashPassword(req.body.password)
        ModelUser.findOne({ email: req.body.email, password : hash })
        .then( result =>{
            console.log(result)
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
                        console.log(token)
                        res.status(200).json({ 
                            msg : 'Register success',
                            token : token
                        })
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
        ModelUser.find({}).populate('transactionsList')
            .then(rows=>{
                
                res.status(200).json({
                    msg : 'List of users',
                    data : rows
                })
            })
            .catch(err =>{
                res.status(500).json({ msg : err})
            })
    }


    
}

module.exports = UserController