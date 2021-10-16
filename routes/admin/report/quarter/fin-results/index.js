const express = require('express')
const router = express.Router()
const center = 'text-align: center;'
const headers = [
  { key: 'title', text: 'Наименование показателя' },
  { key: 'kod', text: 'Код строки', style: center},
  { key: 'end', text: 'За отчётный квартал', style: center },
  { key: 'start', text: 'С начала года', style: center }
]
const title = 'Форма 0202. Финансовый результат (ежеквартальный)'

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
    res.status(500).json({ 'fin-results': e.message })
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
    res.status(500).json({ 'fin-results': e.message })
  }
})

module.exports = router