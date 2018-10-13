'use strict'

const User = require('../models/user')
const jwt = require('jsonwebtoken')
const hashPassword = require('../helpers/hashPassword')
const isEmail = require('../helpers/isEmail')


class UserController{
    // register user
    static registerUser(req,res){

      // email validation
      if(isEmail(req.body.email)){
        let hash = hashPassword(req.body.password)
        User.create({
            name: req.body.name,
            email: req.body.email,
            password: hash,
            thirdpartylogin: 'NO'   
        })
        .then(user =>{
            jwt.sign({
                userid: user._id,
                name: user.name,
                email: user.email,
                role: user.role
            },process.env.SECRETTOKEN,(err,token)=>{
                    if(!err){
                        res.status(200).json({
                            msg: 'Registration success',
                            token: token
                        })
                    }else{
                        res.status(500).json({
                            msg: 'ERROR Register TOKEN ',err
                        })
                    }
            })
        })
        .catch(error =>{
            res.status(500).json({
                msg: 'ERROR Register ',error
            })
        })
      }else{
        res.status(500).json({
            msg: 'Please Check Your Email'
        })
      }
    }

    // user login
    static loginUser(req,res){
       // let's validate email
       if(isEmail(req.body.email)){
          let hash = hashPassword(req.body.password)
          User.findOne({
             email: req.body.email,
             password: hash 
          })
            .then(user => {
                // get the jwt token 
                jwt.sign({
                    userid: user._id,
                    name: user.name,
                    email: user.email,
                    role: user.role
                },process.env.SECRETTOKEN, (err,token)=>{
                    if(!err){
                       res.status(200).json({
                          msg: 'Login successful',
                          token: token 
                       }) 
                    }else{
                        res.status(500).json({
                           msg: 'ERROR Login Token ',err  
                        })
                    }
                })
            })
            .catch(error => {
                res.status(500).json({
                   msg: 'ERROR Login ',error 
                })
            })   
       }else{
          res.status(500).json({
              msg: 'Please Check Your Email'
          })
       }
    }

    // get user detail
    static getUserDetail(req,res){
        User.findOne({
          _id: req.decoded.userid
        }).populate('transactionslist')
          .then(user =>{
             res.status(200).json({
                 msg: `Detail of User ${user.name}`,
                 data: user
             })
          })
          .catch(error =>{
              res.status(500).json({
                  msg: 'ERROR User Detail: ',error
              })
          })
    }

    // register for admin
    static setAdmin(req,res){
       
       // check email
       if(isEmail(req.body.email)){
          
          // check setuppassword
          if(req.headers.secretcode === process.env.SETADMIN){
            let hash = hashPassword(req.body.password)
            User.create({
                name: req.body.name,
                email: req.body.email,
                password: hash,
                role: 'admin',
                thirdpartylogin: 'NO'
            })
                .then(user =>{
                    res.status(200).json({
                        msg: 'Admin registration successful',
                        name: user.name,
                        email: user.email,
                        role: req.body.role
                    })
                })
                .catch(error => {
                    res.status(500).json({
                        msg: 'ERROR Admin registration: ',error
                    })
                })
          }else{
            res.status(500).json({
               msg: 'Please contact your system administrator'
            })
          }
       }else{
          res.status(500).json({
            msg: 'Please Check Your Email'
          })
       }
    }

    // get credentials
    static getCredentials(req,res){
        User.findOne({
            _id: req.decoded.userid
        })
          .then(user => {
             let obj = {
                name: user.name,
                role: user.role,
                transactionslist: user.transactionslist
             } 
             res.status(201).json({
                msg: 'Get Credentials Success ',
                data: obj
             })
          })
          .catch(error =>{
            res.status(500).json({
                msg: 'ERROR Get Credentials ',error
             })
          })
    }
}

module.exports = UserController