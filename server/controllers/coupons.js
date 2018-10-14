const Coupon = require('../models/couponModel')

module.exports = {

    addR: function (code, discount, id) {
        Coupon.create({
            code: code,
            discount: discount,
            validUser: id
        })
        .then(data => {
            return data.code
        })
        .catch(err => {
            return err
        })
    },

    check: function (req, res) {
        Coupon.findOne({
            code: req.params.code,
            validUser: req.userId
        })
        .then(data => {
            res.status(200).json(data)
        })
        .catch(err => {
            res.status(500).json({message: err})
        })
    },

    use: function (req, res) {
        Coupon.deleteOne({
            code: req.params.code,
            validUser: req.userId
        })
        .then(() => {
            res.status(200).json({})
        })
        .catch(err => {
            res.status(500).json({message: err})
        })
    }
}