'use strict'

const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const TransactionSchema = new Schema({
    iduser : {type : Schema.Types.ObjectId,ref : 'User'},
    itemlist :  [
        {   
            iditem :{type : Schema.Types.ObjectId, ref : 'Item'},
            qty: {type:Number,default:0},
            price:{type:Number,default:0}
        }],
    amount: Number,
    date : {type : Date,default : new Date()}
})
// TransactionSchema.post('save', function (doc, next) {

//     generatePassword(this.email, this.password)
//     .then(function(newPassword){
//         User.update(
//             { _id : user._id},
//             { password : newPassword}
//         )
//         .then(function(){})
//         .catch(function(){})
//     })
    
//   })

const Transaction = mongoose.model('Transaction',TransactionSchema);

module.exports = Transaction