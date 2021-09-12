const express = require('express')
const router = express.Router()
const center = 'text-align: center;'
const header = [
  { key: 'title', text: 'Наименование показателя' },
  { key: 'kod', text: 'Код строки', style: center},
  { key: 'start', text: 'На начало отчётного месяца', style: center },
  { key: 'end', text: 'На конец отчётного месяца', style: center }
]    
router.get('/', 
  require('../period'),
  require('./issued'),
  require('./values'),
  async ({ values }, res) => {
  res.json({ header, values })
})

module.exports = router