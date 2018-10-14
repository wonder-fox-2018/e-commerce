const router = require('express').Router()

router.get('/',(req,res)=>{
    res.status(201).json({
        message : 'halo dari users yang belum dibuat'
    })
})

module.exports = router;