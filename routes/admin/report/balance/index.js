
const center = 'text-align: center;'
const headers = [
  { key: 'account', text: '', is: 'th' },
  { key: 'startDt', text: ''},
  { key: 'startCt', text: ''},
  { key: 'dt', text: 'Дт'},
  { key: 'ct', text: 'Кт'},
  { key: 'endDt', text: ''},
  { key: 'endCt', text: ''}
]
const title = 'Баланс'
const get = async (req, res) => {
const values = await require('./values')(req, res)
try {
    res.json([
      { row: 'my-3', children: [
        { is: 'strong', value: title }
      ]},
      { row: 'my-3', children: [
        { is: 'report-table', attrs: { hovered: 'cell', headers, values }}
      ]},
    ])
  } catch(e){
    console.log(e);
    res.status(500).json({ message: e.message })
  }
}


module.exports = { get }