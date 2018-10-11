const jwt = require('jsonwebtoken')

class Middleware {
    static authenticate(req,res,next) {
        if(req.headers.token) {
            let decoded = jwt.verify(req.headers.token, process.env.jwtToken, function(err, decoded) {
            if (err) {
                console.log('SALAHHHH'); 
            }
            else {
                req.data = decoded
                req.decoded = decoded.role
                next()
                console.log(decoded.role);
            }
            })
        }
    }
    static authorize(req, res, next) {
        if(req.decoded === 'admin') {
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