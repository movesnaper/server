const { headers } = require('./header')
const get = async (req, res) => {
  const { selectors, period, header } = await require(`../header`)(req, res)
  try {
    res.json([
      { row: 'my-3', children: [...selectors, { is: 'print' }] },
      { is: 'strong', value: `Форма 0203. Отчёт о наличии задолжности по финансовым кредитам,
        не возвращённых в срок, указанный в договоре (ежемесячный)` },
      { row: 'my-3', children: period },
      ...header,
      { row: 'my-3', children: [ 
        { col: 'col', is: 'report-table', attrs: { headers, hovered: 'row' }}
      ]},
    ].filter((v) => v))
  } catch(e){
    console.log(e);
    res.status(500).json({ penalty: e.message })
  }
};

module.exports = { get }