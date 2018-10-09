'use strict'

const Transaction = require('../models/transaction')
const User = require('../models/user')
const nodemailer = require('nodemailer')

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

                // create email
                let transporter = nodemailer.createTransport(
                    {
                        service: 'gmail',
                        auth: {
                            user: process.env.EMAIL,
                            pass: process.env.PASSWORD
                        }
                    }
                )

                let mailOptions = {
                    from: '"ECosmetics" <ecosmetics23.wonder.gmail.com>', // sender address
                    to: 'efrat.sadeli@gmail.com', // list of receivers
                    subject: 'Transaction sent!', // Subject line
                    text: 'Sent?', // plain text body
                    html: '<b>Sent?</b>' // html body
                };

                transporter.sendMail(mailOptions, (error, info)=>{
                    if (error) {
                            console.log('Error occurred');
                            console.log(error.message);
                            // return process.exit(1);
                    }else{
                        console.log('Message sent successfully!');
                        console.log(nodemailer.getTestMessageUrl(info));
                
                        // only needed when using pooled connections
                        // transporter.close();
                    }
                
                        
                })

                // nodemailer.createTestAccount((err,account)=>{
                //     if(err){
                //         console.error('Failed to create a testing account');
                //         console.error(err);
                //         return process.exit(1);
                //     }


                    

                //     transporter.sendMail(mailOptions, (error, info) => {
                //         if (error) {
                //             console.log('Error occurred');
                //             console.log(error.message);
                //             return process.exit(1);
                //         }
                
                //         console.log('Message sent successfully!');
                //         console.log(nodemailer.getTestMessageUrl(info));
                
                //         // only needed when using pooled connections
                //         transporter.close();
                //     });
                // });

                // res.status(200).json({
                //     msg: 'Transaction success',
                //     data: newtransaction,
                //     owner: user
                // })
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