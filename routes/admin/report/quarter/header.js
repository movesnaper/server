
module.exports = async (req, res) => {
  const { periods } = require('./period')(req, res)
  const company = req.company
  return  {
    header: require(`../header`)(company),
    selector:  [ 
      { is: 'selector', attrs: { key: 'period', label: "Период", options: periods }},
      {},
      { col: 'col-2', is: 'print', attrs: { label: "Печать" }}
    ]
  }
}