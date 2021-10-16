const express = require('express')
const router = express.Router()

router.get('/', async (req, res) => {
    try {
      res.json([
        { key: 'month', text: 'Месячный', tabs: [ 
          { key: 'kassa', text: 'Касса ломбарда' },
          { key: 'ostatki', text: 'Ведомость остатков' },
          { key: 'penalty', text: '0203 Задолжность по кредитам' }
          ]
        },
        { key: 'quarter', text: 'Квартальный', 
          tabs: [
            { key: 'main', text: '0201 Отчёт о деятельности' },
            { key: 'fin-results', text: '0202. Отчёт о деятельности' }
          ]
        }
      ])
    } catch(e) {
      console.error(e);
      res.status(500).json({ schema: e.message })
    }
})

module.exports = router