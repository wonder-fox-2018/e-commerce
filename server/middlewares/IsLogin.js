'use strict'

const jwt = require('jsonwebtoken');
const ModelUser = require('../models/userModel');
const mongoose = require('mongoose');
const ObjectId = mongoose.Types.ObjectId;

function IsLogin(req,res,next) {
    
    // check if token exists
    if(req.headers.token){

        // verify token
        jwt.verify(req.headers.token,process.env.SECRET_KEY,(error,decoded)=>{
            if(error){
                res.status(403).json({ msg : 'Invalid jwt-token' });
            }else{
                let idCheck = ObjectId(decoded.user_id)
                ModelUser.findOne({ _id : idCheck,email : decoded.email })
                    .then(result =>{
                        console.log(result)
                        if(result){
                            req.currentUser=result
                            req.id = result._id,
                            req.name = result.name,
                            req.email = result.email,
                            req.decoded = decoded;
                            next();

                        }else if(row ===null){
                            res.status(403).json({ msg : 'Token not found' });
                        }
                    })
                    .catch(err =>{
                        res.status(500).json({ msg : err });
                    })
            }
        })
    }else{
        res.status(403).json({ msg : 'Token not found' });
    }
}

module.exports = IsLogin
