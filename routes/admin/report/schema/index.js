const express = require('express')
const router = express.Router()

router.get('/', 
  require('./period'), 
  require('./lombard'), 
  async (req, res) => {
    console.log();
    try {
      const period = { key: 'period', label: 'Период'}
      const minfin = req.company.minfin
      const company = {
        schema: [
          { label: 'Наименование финансового учреждения', key: 'title'},
          { label: 'Код финансового учреждения', key: 'kod'},
        ],
        title: req.company.name,
        kod: req.company.kod,
      }
      res.json([
        { key: 'month', text: 'Месячный', period: {...period, values: req.month }, tabs: [ 
            require('../month/kassa/schema'),
            require('../month/ostatki/schema'),
            require('../month/penalty/schema'),
          ].map((v) => ({company, minfin, lombard: req.lombard, ...v }))
        },
        { key: 'quarter', text: 'Квартальный', period: {...period, values: req.quarter }, tabs: [
            require('../quarter/main/schema'),
            require('../quarter/fin-results/schema'),
          ].map((v) => ({company, minfin, lombard: req.lombard, ...v }))
        }
      ])
    } catch(e) {
      console.error(e);
      res.status(500).json({ schema: e.message })
    }
})

module.exports = router