
const title = 'Касса ломбардов'
const headers = [
  { key: 'date', value: 'Дата' },
  { key: 'prixod', value: 'Приход'},
  { key: 'ct377', value: 'Ссуда'},
  { key: 'ct703', value: 'Процент'},
  { key: 'ct704', value: 'Пеня'},
  { key: 'totalDt', value: 'Итого Дт', is: 'th'},
  { key: 'dt377', value: 'Ссуда'},
  { key: 'dt703', value: 'Процент'},
  { key: 'rasxod', value: 'Расход'},
  { key: 'totalCt', value: 'Итого Кт', is: 'th'},
  { key: 'ok', value: 'Ок', is: 'th' }
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
          hovered: 'row',
          values: period && await require('./values')(req, res)
        }}
      ]},
      !period && require(`../../noPeriod`)
    ])
  } catch(e){
    console.log(e);
    res.status(500).json({ kassa: e.message })
  }
};

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
      { row: 'my-3', children: [
         { is: 'report-table', attrs: {
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