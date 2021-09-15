const express = require('express')
const router = express.Router()
const { toDouble, toNumber } = require('../../functions')

router.get('/',
  require('../period'),
  require('./ok'),
  require('./values'),
  async ({ values, ok }, res) => {
    const total = (key) => toDouble(values.reduce((cur, v) => cur += toNumber(v[key]), 0))
    res.json({ 
      values: [ { 
        ok: toDouble(ok) }, 
        ...values, 
        {
          prixod: total('prixod'),
          ct377: total('ct377'),
          ct703: total('ct703'),
          ct704: total('ct704'),
          totalDt: total('totalDt'),
          dt377: total('dt377'),
          dt703: total('dt703'),
          rasxod: total('rasxod'),
          totalCt: total('totalCt'),
        }
      ],
    })
})

module.exports = router