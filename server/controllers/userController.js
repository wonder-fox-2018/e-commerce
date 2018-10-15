const User = require('../models/user')
const jwt  = require('jsonwebtoken')
const bcrypt = require('bcrypt')
const { encrypt } = require('../helpers')

class Controller {
    static signup(req,res){
        encrypt(req.body.password)
        .then(function(encryptedPassword) {
            
            let newUser = new User({
                name:  req.body.name,
                email:   req.body.email,
                password: encryptedPassword,
                isAdmin: false
            })

            return newUser
        })
        .then(function(newUser) {
            // console.log(newUser)

            newUser.save()
            res.status(200).json({
                user : newUser,
                message : 'Signup Success'
            })

        })
        .catch(function(err){
           console.log(err)
           res.status(500).json({
               error : err.errors
           })
        })
    }

    static signin(req,res){
        User.findOne({
            email : req.body.email
        })
        .then(function(dataUser){            
            let decrypt = bcrypt.compareSync(req.body.password, dataUser.password);          
            if(decrypt == true){
                let token = jwt.sign({
                    userId : dataUser._id,
                    name : dataUser.name,
                    email : dataUser.email,
                    isAdmin : dataUser.isAdmin
                }, process.env.SECRET_KEY)

                res.status(200).json({
                    userId : dataUser._id,
                    name : dataUser.name,
                    email : dataUser.email,
                    isAdmin : dataUser.isAdmin,
                    token : token
                })
            }else{
                res.status(500).json({
                    message : 'Invalid password'
                })
            }
        })
        .catch(function(){
            res.status(500).json({
                message : `Invalid username`
            })
        })
    }
}

module.exports = Controller;