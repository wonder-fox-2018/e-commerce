const User = require('../models/user')
const jwt = require('jsonwebtoken')
require('dotenv').config()

class Authentication{
    static isLogin(req, res, next){
        try {
            let decoded = jwt.verify(req.headers.token, process.env.SECRET)
            console.log(decoded)
            User.findOne({ email : decoded.email})
            .then(user => {
                if(user){
                    req.login = decoded
                    next()
                }
                else{
                    res.status(200).json({ message : 'you dont have authorize for this action'})
                }
            })
        }
        catch (error) {
            res.status(401).json({message : `You must login First`})
        }

    }
    static isOwner(req, res, next){
        const id = new mongoose.Types.ObjectId(req.params.id); 
        User.find({todo : id})
        .then(data => {
            const idLogin = mongoose.Types.ObjectId(req.login.id)
            const idData = mongoose.Types.ObjectId(data[0]._id)
            if(idLogin.equals(idData)){
                next()
            }
            else{
                res.send('data tidak ditemukan')
            }
        })
        .catch(err => {
            res.send(err.message)
        })
    }

}

module.exports = Authentication