const { headers } = require('./header')
const get = async (req, res) => {
  const { selectors, period, header } = await require(`../header`)(req, res)
  try {
    res.json([
      { row: 'my-3', children: [...selectors, { is: 'print' }] },
      { is: 'strong', value: 'Ведомость остатков' },
      { row: 'my-3', children: period },
      ...header,
      { row: 'my-3', children: [ 
        { col: 'col', is: 'report-table', attrs: { headers, hovered: 'row' }}
      ]},
    ].filter((v) => v))
  } catch(e){
    console.log(e);
    res.status(500).json({ ostatki: e.message })
  }
};

module.exports = { get }