const express = require('express')
const router = express.Router()

router.get('/', 
  require('./period'), 
  require('./lombard'), 
  async (req, res) => {
    try {
      const period = { key: 'period', label: 'Период'}
      const company = {
        schema: [
          { label: 'Наименование финансового учреждения', key: 'title'},
          { label: 'Код финансового учреждения', key: 'kod'},
        ],
        title: req.company.name,
        kod: req.company.kod,
      }
      const sign = [
        { post: 'Бухгалтер', fio: req.company.bookkeeper },
        { post: 'Директор', fio: req.company.director },
      ]
      const values = (v) => ({company, sign, ...v })
      res.json([
        { key: 'month', text: 'Месячный', period: {...period, values: req.month }, tabs: [ 
            require('../month/kassa/schema')(req),
            require('../month/ostatki/schema')(req),
            require('../month/penalty/schema')(req)
          ].map(values)
        },
        { key: 'quarter', text: 'Квартальный', period: {...period, values: req.quarter }, tabs: [
            require('../quarter/main/schema')(req),
            require('../quarter/fin-results/schema')(req)
          ].map(values)
        }
      ])
    } catch(e) {
      console.error(e);
      res.status(500).json({ schema: e.message })
    }
})

module.exports = router