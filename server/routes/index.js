const router = require('express').Router()

router.get('/',(req,res)=>{
    res.send('halo dari index')
})

module.exports = router;