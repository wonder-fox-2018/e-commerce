require('dotenv').config()
const User = require('../models/users')
const jwt = require('jsonwebtoken')


module.exports = {
    isAdmin: function(req, res, next){        
        let user = jwt.verify(req.headers.token, process.env.JWT_SALT)
        if(user.isAdmin){
            next()
        } else {
            res.send(400).json({message: "must Admin!!"})   
        }
    },
    isLogin: function(req, res, next){
        let token = req.headers.token        
        if(token){
            let decoded = jwt.verify(req.headers.token, process.env.JWT_SALT)
            if(decoded){
                req.decoded = decoded
                next()
            } else {
                res.status(500).json({
                    status: 'failed',
                    message: 'Please Login first!'
                })
            }
        }
    }



}