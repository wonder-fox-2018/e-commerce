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
                email: user.email
            },process.env.SECRETTOKEN,(err,token)=>{
                    if(!err){
                        res.status(200).json({
                            msg: 'Registration success',
                            token: token
                        })
                    }else{
                        res.status(500).json({
                            msg: 'ERROR TOKEN ',err
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
}

module.exports = UserController