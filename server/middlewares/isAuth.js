const jwt = require('jsonwebtoken');

module.exports = {

    isLogin: function (req, res, next) {
        jwt.verify(req.body.jwtToken, process.env.JWT_KEY, (err, decoded) => {
            if (err) {
                next(err.message)
            } else {
                req.userId = decoded.id
                req.isAdmin = decoded.isAdmin
                next()
            }
        })
    },

    isAdmin: function (req, res, next) {
        if (req.isAdmin === 1) {
            next()
        } else {
            next('Access denied')
        }
    }
}