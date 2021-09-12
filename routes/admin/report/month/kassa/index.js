const express = require('express')
const router = express.Router()
const { toDouble } = require('../../functions')

router.get('/',
  require('../period'),
  require('./ok'),
  require('./values'),
  async ({ ok, values }, res) => {
    const total = (key) => toDouble(values.reduce((cur, v) => cur + v[key], 0))
    const header = [
      { key: 'date', text: 'Дата', is: 'th', total: 'Итого', type: 'date' },
      { key: 'prixod', text: 'Приход', total: total('prixod') },
      { key: 'ct377', text: 'Ссуда', total: total('ct377') },
      { key: 'ct703', text: 'Процент', total: total('ct703') },
      { key: 'ct704', text: 'Пеня', total: total('ct704') },
      { key: 'totalDt', text: 'Итого Дт', is: 'th', total: total('totalDt') },
      { key: 'dt377', text: 'Ссуда', total: total('dt377') },
      { key: 'dt703', text: 'Процент', total: total('dt703') },
      { key: 'rasxod', text: 'Расход', total: total('rasxod') },
      { key: 'totalCt', text: 'Итого Кт', is: 'th', total: total('totalCt') },
      { key: 'ok', text: toDouble(ok), is: 'th' }
    ].map((v) => ({...v, type: v.type || 'double'}))
    res.json({ header, values})
})

module.exports = router