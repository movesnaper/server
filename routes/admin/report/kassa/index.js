const express = require('express')
const router = express.Router()

const headers = [
  'date',
  'prixod',
  'ct377',
  'ct703',
  'ct704',
  'totalDt',
  'dt377',
  'dt703',
  'rasxod',
  'totalCt'
]

const period = ( { month }, res, next ) => {
  if(!month) res.status(500).json({ period: 'no_month_specified' })
  else next()
}

router.get('/schema', require('./lombards'), require('./periods'), async ({ lombards, periods, year }, res) => {
  res.json({ year: year.format('YYYY'), lombards, periods, headers })
})

router.get('/', period, require('./ok'), require('./values'),  async ({ ok, values }, res) => {
  res.json({ ok, values })
})

module.exports = router