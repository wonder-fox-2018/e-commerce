const jwt = require('jsonwebtoken')

class Middleware {
    static authenticate(req,res,next) {
        if(req.headers.token) {
            let decoded = jwt.verify(req.headers.token, process.env.jwtToken, function(err, decoded) {
            if (err) {
                console.log('User does not exist in database.'); 
                res.status('User does not exist in database')
            }
            else {
                req.data = decoded
                req.role = decoded.role
                next()
                console.log(decoded.role);
            }
            })
        }
    }
    static authorize(req, res, next) {
        if(req.role === 'admin') {
            console.log(req.data);
            
            next()
        }
        else {
            res.status(400).json({
                message: 'You are not authorized!!!!!!'
            })
        }
    }
}

module.exports = Middleware