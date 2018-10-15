const Market = require('../models/market')
const User = require('../models/user')

function accessMarket (req,res,next) {

  if(req.accessMarket === true){
    
    Market.findOne({ user : req.userId })
      .populate('user')
      .then((market) => {

        if(market){
          req.marketId = market._id
          next()
        } else {
          res.status(404).json({
            message: `you didn't have market`
          })
        }

        
      })
      .catch((err) => {
        res.status(404).json({
          message: `you didn't have market`
        })
      })

  } else {
    res.status(404).json({
      message: `you didn't have market`
    })
  }

}

module.exports = accessMarket