const express = require('express')
const router = express.Router()
const title = 'Касса ломбардов'
const headers = [
  { key: 'date', text: 'Дата', is: 'th', type: 'date' },
  { key: 'prixod', text: 'Приход'},
  { key: 'ct377', text: 'Ссуда'},
  { key: 'ct703', text: 'Процент'},
  { key: 'ct704', text: 'Пеня'},
  { key: 'totalDt', text: 'Итого Дт', is: 'th'},
  { key: 'dt377', text: 'Ссуда'},
  { key: 'dt703', text: 'Процент'},
  { key: 'rasxod', text: 'Расход'},
  { key: 'totalCt', text: 'Итого Кт', is: 'th'},
  { key: 'ok', text: 'Ок', is: 'th' }
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
    res.status(500).json({ kassa: e.message })
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
    res.status(500).json({ 'kassa-print': e.message })
  }
})

module.exports = router