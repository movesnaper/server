
const express = require('express')
const models = require('../../models')
const router = express.Router()


const Transaction = function(opt) {
    Object.assign(this, opt)
    // return 
    // {
    //     save: (name, opt) => models[name].save({...opt, lombard}, conn),
    //     dt: (name, opt) => models[name].dt({...opt, lombard}, conn),
    //     kt: (name, opt) => models[name].kt({...opt, lombard}, conn),
    // }   
}


const ssuda = (transaction) => async ({body}, res) => {
    // const bilet = await save('bilet', body)
    // await kt('kassa', await dt('ssuda', bilet))
    // await dt('kassa', await kt('procent', bilet))
    res.json('ok')     
}


module.exports = conn => {
    // const transaction = new Transaction(body)
    // router.post('/ssuda', ssuda(transaction))
    return router
}

// module.exports = lombard => {
//     const transaction = new Transaction(lombard)
//     router.post('/ssuda', ssuda(transaction))
//     router.post('/vozvrat', vozvrat(transaction))
//     router.post('/sklad', sklad(transaction))
//     router.post('/prixod', prixod(transaction))
//     router.post('/rasxod', rasxod(transaction))
//     return router
// }