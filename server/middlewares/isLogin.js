'use strict'

const User = require('../models/user')
const jwt = require('jsonwebtoken')

function isLogin(req,res,next){
  
  // pre-check the req.headers
  if(req.headers.hasOwnProperty('token')){
    // get user information from token
    jwt.verify(req.headers.token, process.env.SECRETTOKEN,(err, decoded)=>{
        // verify user information
        User.findOne({
            _id: decoded.userid
        })
          .then(user =>{
             if(user){
                req.decoded = decoded
                next()
             }else if(user === null){
                res.status(403).json({
                   msg: 'ERROR Token: User is not authorized' 
                })  
             }
          })
          .catch(error =>{
            res.status(500).json({
               msg: 'ERROR Token: ',error
            })
          })
    })
  }else{
     res.status(403).json({
        msg: 'ERROR: User not authorized' 
     }) 
  }
}

module.exports = isLogin