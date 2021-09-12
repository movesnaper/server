const express = require('express')
const router = express.Router()
const { toNumber, toDouble } = require('../../functions')

const style="text-align: right"

router.get('/',
  require('../period'),
  require('./payed'),
  require('./issued'),
  require('./klients'), 
  require('./values'),
  async ({ values }, res) => {

  const total = (key) => toDouble(values.reduce((cur, v) => cur + toNumber(v[key]), 0))
  
  const header = [
    { key: 'index', text: '#'},
    { key: 'bilet', text: 'Билет', is: 'th'  },
    { key: 'date', text: 'Дата', type: 'date' },
    { key: 'klient', text: 'ФИО' },
    { key: 'ssuda', text: 'Ссуда', total: total('ssuda'), type: 'double', style },
    { key: 'title', text: 'Наименование'},
    { key: 'proba', text: 'Проба' },
    { key: 'ves', text: 'вес', style },
    { key: 'price', text: 'Цена', style },
    { key: 'ocenca', text: 'Оценка', is: 'th', total: total('ocenca'), type: 'double', style }
  ]
  res.json({ header, values })
})

module.exports = router