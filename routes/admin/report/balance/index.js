
const headers = [
  { children: [
     { value: 'Счёт', key: 'account', width: '10%' } 
    ]},
  { is: 'date-picker', attrs: { key: 'start' }, children: [
    { key: 'startDt', value: 'Дт', width: '10%' },
    { key: 'startCt', value: 'Кт', width: '10%' }
  ] },
  { key: 'dt', value: 'Дт', width: '10%' },
  { key: 'ct', value: 'Кт', width: '10%' },
  { is: 'date-picker', attrs: { key: 'end' }, children: [
    { key: 'endDt', value: 'Дт', width: '10%' },
    { key: 'endCt', value: 'Кт', width: '10%' }
  ]},
]
const get = async (req, res) => {
const values = await require('./values')(req, res)
try {
    res.json([
      { is: 'report-table', attrs: { hovered: 'cell', headers, values }},
    ])
  } catch(e){
    console.log(e);
    res.status(500).json({ message: e.message })
  }
}


module.exports = { get }