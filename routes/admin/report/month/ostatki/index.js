
const title = 'Ведомость остатков'
const right="text-align: right"
const headers = [
  { key: 'index', text: '#'},
  { key: 'number', text: 'Билет', is: 'th'  },
  { key: 'date', text: 'Дата', type: 'date' },
  { key: 'klient', text: 'ФИО' },
  { key: 'ssuda', text: 'Ссуда', type: 'double', style: right, is: 'th' },
  { key: 'title', text: 'Наименование', style: right},
  { key: 'proba', text: 'Проба' },
  { key: 'ves', text: 'вес', style: right },
  { key: 'price', text: 'Цена', style: right },
  { key: 'ocenca', text: 'Оценка', style: right }
]

const get = async (req, res) => {
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
    res.status(500).json({ 'ostatki': e.message })
  }
}

const print = async (req, res) => {
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
    res.status(500).json({ message: e.message })
  }
}
module.exports = { get, print }