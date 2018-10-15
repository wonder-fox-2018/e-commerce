'use strict'

function transactionStatement(input){
    let str = ''
    let rawTransactionArr = input
    rawTransactionArr.forEach((item, index) => {
        str = str + `
           <tr>
             <td>${index+1}</td> 
             <td>${item.itemname}</td> 
             <td>${item.itemprice} IDR </td>
           </tr>\n 
        `
    });
    return str
}

module.exports = transactionStatement