'use strict'

const Transaction = require('../models/transaction')
const User = require('../models/user')

class TransactionController {
    //create transaction
    static createTransaction(req,res){
        Transaction.create({
            transactionuserid: req.decoded.userid,
            transactionitemid: req.body.transactionitemid,
            transactionamount: Number(req.body.transactionamount) 
        })
          .then(transaction => {
            let newtransaction = transaction  
            // update user
            User.findOneAndUpdate({
                _id: transaction.transactionuserid
            },{
                $push: {
                    transactionslist: transaction._id
                }
            })
              .then(user => {
                res.status(200).json({
                    msg: 'Transaction success',
                    data: newtransaction,
                    owner: user
                })
              })
              .catch(error => {
                  res.status(500).json({
                      msg: 'ERROR update transaction to user ',error
                  })
              })
          })
          .catch(error => {
              res.status(500).json({
                  msg: 'ERROR Create transaction ',error
              })
          })
    }

    // show transaction
    static showListTransaction(req,res){
        Transaction.find({}).populate('transactionitemid')
         .then(transactions =>{
            res.status(200).json({
                msg: 'List of transactions',
                data: transactions
            })
         })
         .catch(error => {
            res.status(500).json({
                msg: 'ERROR Get list of transactions ',error
            }) 
         })
    }
}

module.exports = TransactionController