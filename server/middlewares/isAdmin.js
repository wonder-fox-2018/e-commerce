'use strict'

function isAdmin(req,res,next){
    if(req.decoded.role === 'admin'){
        next()
    }else{
        res.status(403).json({
            msg: 'User doesn\'t have admin authorization '
        })
    }
}

module.exports = isAdmin