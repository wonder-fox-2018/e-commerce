'use strict'

const Crypto = require('crypto');

function HashPassword(str){
    const secret = process.env.SECRET_KEY;
    const hash = Crypto.createHmac('sha256',secret)
                    .update(str)
                    .digest('hex')
    
    return hash;                
}

module.exports = HashPassword