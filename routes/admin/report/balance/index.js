
const headers = [
  { key: 'account', value: 'Счёт', width: '10%' },
  { value: 'На начало периода', children: [
    { key: 'startDt', value: 'Дт', width: '10%' },
    { key: 'startCt', value: 'Кт', width: '10%' },
  ]},
  { key: 'dt', value: 'Дт', width: '10%' },
  { key: 'ct', value: 'Кт', width: '10%' },
  { value: 'На конец периода', children: [
    { key: 'endDt', value: 'Дт', width: '10%' },
    { key: 'endCt', value: 'Кт', width: '10%' }
  ]}
]

const get = async (req, res) => {
  const { date } = req.company.settings
  const selectors = [ 
    { col: 'col', is: 'date-picker', attrs: { key: 'start', value: date }},
    { col: 'col', is: 'date-picker', attrs: { key: 'end' } }
  ]  
  try {
    res.json([
      { row: 'my-3', children: [...selectors, { is: 'print' }] },
      { is: 'strong', value: 'Баланс' },
      { is: 'report-table', attrs: { hovered: 'cell', headers }}
    ])
  } catch(e){
    console.log(e);
    res.status(500).json({ message: e.message })
  }
}

module.exports = { get }