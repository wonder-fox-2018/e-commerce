require('dotenv').config()
const {OAuth2Client} = require('google-auth-library');
const client = new OAuth2Client(process.env.ID_GOOGLE);
const axios = require('axios')
const User = require('../models/users')
const bcrypt = require('bcryptjs')
const jwt = require('jsonwebtoken')

module.exports = {
    glogin: function(req, res){
        let token = req.headers.gtoken
        let tiket = new Promise ((resolve, reject) => {
            client.verifyIdToken({
                idToken: token,
                audience: process.env.ID_GOOGLE
            }, function(err, data){
                if(err){
                    reject(err)
                } else {
                    const payload = data.getPayload();
                    const userid = payload['sub'];
                    resolve(userid)
                }
            })
        }) 
        .then((result) => {
            axios ({
                method: 'GET',
                url: `https://www.googleapis.com/oauth2/v3/tokeninfo?id_token=${token}`
            })
            .then((result) => {
                console.log(result);
            })
        }).catch((err) => {
            res.status(500).json({message: err.message})
        });
    },
    register: function(req, res){
        var salt = bcrypt.genSaltSync(10);
        let password = bcrypt.hashSync(req.body.password, salt)
        User.create({
            name: req.body.name,
            email: req.body.email,
            password: password
        })
        .then((result) => {
            res.status(201).json({message: "User Created"})
        }).catch((err) => {
            res.status(500).json({message: err.message})
        });
    },
    edit: function(req, res){
        User.update({
            _id: req.body.id
        }, {
            name: req.body.name,
            password: req.body.password
        })
        .then((result) => {
            res.status(201).json({message: "User Edited"})
        }).catch((err) => {
            res.status(500).json({message: err.message})
        });
    },
    login: function(req, res){
        User.findOne({
            email: req.body.email
        })
        .then((result) => {                        
            if (!result){
                res.status(400).json({status:false, message: "user not found!"})
            } else {
                let password = bcrypt.compareSync(req.body.password, result.password)
                if(password){
                    let token = jwt.sign({
                        id: result._id,
                        name: result.name,
                        email: result.email,
                        isAdmin: result.isAdmin
                    }, process.env.JWT_SALT)
                    res.status(200).json({token: token, message: 'Login sukses'})
                } else {
                    res.status(400).json({message: "Wrong Password!"})
                }
            }
        }).catch((err) => {
            res.status(500).json({message: err})
        });
    },
    getUser: function(req, res){        
        User.findOne({
            _id: req.decoded.id
        })
        .then((result) => {
            res.status(200).json({
                status: 'succees', data: {
                    id: result._id,
                    name: result.name,
                    email: result.email,
                    admin: result.isAdmin
                }
            })
        }).catch((err) => {
            res.status(500).json({
                status: 'failed',
                message: err.message
            })
        });
    }

}