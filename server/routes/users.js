const router = require('express').Router()

router.get('/',(req,res)=>{
    res.send('halo dari users')
})

module.exports = router;