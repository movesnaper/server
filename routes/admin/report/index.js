
const express = require('express')
const router = express.Router()

const company = async (req, res, next) => {
  try {
    req.company = await req.db.get('company')
    next()
  } catch(e) {
    res.status(401).json(e)
  }
}

router.get('/', company, (req, res) => {
  res.json([
    { key: 'report/balance', text: 'Баланс' },
    { key: 'month', text: 'Месячный', children: [ 
      { text: 'Касса ломбарда', key: 'report/kassa' },
      { text: 'Ведомость остатков', key: 'report/ostatki' },
      { text: '0203 Задолжность по кредитам', key: 'report/penalty' }
      ]
    },
    { key: 'quarter', text: 'Квартальный', children: [
        { text: '0201 Отчёт о деятельности', key: 'report/main' },
        { text: '0202. Финансовый результат', key: 'report/fin-results' }
      ]
    }
  ])
})
router.get('/:key/:period?', (req, res) => 
  require(`./${req.params.period || ''}/${req.params.key}`).get(req, res))
router.get('/print/:key/:period', (req, res) => 
  require(`./${req.params.period || ''}/${req.params.key}`).print(req, res))
router.post('/:dir/:file?', (req, res) => 
  require(`./${req.params.dir}/${req.params.file}`)(req, res))


module.exports = router