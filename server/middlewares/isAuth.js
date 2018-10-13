const jwt = require('jsonwebtoken');

module.exports = {

    isLogin: function (req, res, next) {
        jwt.verify(req.headers.token, process.env.JWT_KEY, (err, decoded) => {
            if (err) {
                next(err.message)
            } else {
                req.userId = decoded.id
                if (decoded.isAdmin === 1) {
                    req.isAdmin = true
                } else {
                    req.isAdmin = false
                }
                next()
            }
        })
    },

    isAdmin: function (req, res, next) {
        if (req.isAdmin) {
            next()
        } else {
            next('Access denied')
        }
    }
}