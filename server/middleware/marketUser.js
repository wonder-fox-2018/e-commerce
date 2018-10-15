const User = require('../models/user')

function marketUser (req,res,next) {

  User.findById(req.userId)
    .then((user) => {
      if(user && user.marketAvailable === false){
        next()
      } else {
        res.status(404).json({
          message: 'You have a market'
        })
      }
    })
    .catch((err) => {
      res.status(500).json({
        err
      })
    })

}

module.exports = marketUser