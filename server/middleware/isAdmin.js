module.exports = {
    isAdmin(req, res, next) {
        if(req.decoded.role==='admin'){
            next()
        }
        else{
            res.status(500).json({message:'maaf layanan ini hanya untuk admin'})
        }
    }
}