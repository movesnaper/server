
const express = require('express')
const router = express.Router()
const dirLevel = '/:p1?/:p2?/:p3?'
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
      { text: 'Касса ломбарда', key: 'report/month/kassa' },
      { text: 'Ведомость остатков', key: 'report/month/ostatki' },
      { text: '0203 Задолжность по кредитам', key: 'report/month/penalty' }
      ]
    },
    { key: 'quarter', text: 'Квартальный', children: [
        { text: '0201 Отчёт о деятельности', key: 'report/quarter/main' },
        { text: '0202. Финансовый результат', key: 'report/quarter/fin-results' }
      ]
    }
  ])
})

router.get(dirLevel, (req, res) => {
  const path = Object.values(req.params).filter((v) => v).join('/')
  return require(`./${path}`).get(req, res)
})

router.post(dirLevel, (req, res) => {
  const path = Object.values(req.params).filter((v) => v).join('/')
  return require(`./${path}`).post(req, res)
})

router.delete(dirLevel, (req, res) => {
  const path = Object.values(req.params).filter((v) => v).join('/')
  return require(`./${path}`).remove(req, res)
})

module.exports = router