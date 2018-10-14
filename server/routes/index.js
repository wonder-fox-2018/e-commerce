const router = require('express').Router()

router.get('/',(req,res)=>{
    res.status(201).json({
        message : `
        /items to get all item
        
        `
    })
})

module.exports = router;