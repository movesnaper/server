const express = require('express')
const router = express.Router()
const title = `Форма 0203. Отчёт о наличии задолжности по финансовым кредитам,
 не возвращённых в срок, указанный в договоре (ежемесячный)`
const center = 'text-align: center;'
const headers = [
  { key: 'title', text: 'Наименование показателя' },
  { key: 'kod', text: 'Код строки', style: center},
  { key: 'start', text: 'На начало отчётного месяца', style: center },
  { key: 'end', text: 'На конец отчётного месяца', style: center }
]

router.get('/', async (req, res) => {
  const { value: period = '' } = require('../period')(req, res)
  const { header, selector } = await require(`../header`)(req, res)
  try {
    res.json([
      { row: 'my-3', children: selector },
      { row: 'my-3', children: [ 
        { is: 'strong', value: title },
        { value: `По состоянию на ${period}`}
      ]},
      ...header,
      { row: 'my-3', children: [ { is: 'report-table', attrs: { 
          headers,
          values: period && await require('./values')(req, res)
        }}
      ]},
      !period && require(`../../noPeriod`)
    ])
  } catch(e){
    console.log(e);
    res.status(500).json({ 'penalty': e.message })
  }
});

router.get('/print', async (req, res) => {
  try {
  const { value: period } = require('../period')(req, res)
  if (!period) throw new Error('no period specified')
  const { header } = await require(`../header`)(req, res)
    res.json([
      { row: 'my-3', children: [ 
        { is: 'strong', value: title },
        { value: `По состоянию на ${period}`}
      ]},
      ...header,
      { row: 'my-3', children: [ { is: 'report-table', attrs: { 
          headers,
          values: await require('./values')(req, res)
        }}
      ]},
      ...require(`../../sign`)(req, res)
    ])
  } catch(e){
    console.log(e);
    res.status(500).json({ 'penalty-print': e.message })
  }
})

module.exports = router