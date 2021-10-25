
module.exports = async (req, res) => {
  const { lombard } = req.query
  const { periods } = require('./period')(req, res)
  const lombards = await require('./lombards')(req, res)
  const company = lombard && lombards.find((v) => v._id === lombard) || req.company
  return  {
    header: require(`../header`)(company),
    selector:  [ 
      { is: 'selector', attrs: { key: 'period', label: "Период", options: periods }},
      { is: 'selector', attrs: { key: 'lombard', options: [
        { key: null, value: 'Все ломбарды'},
        ...lombards.map((v) => ({ key: v._id, value: v.name }))
      ] }},
      {},
      { col: 'col-2', is: 'print', attrs: { 
        label: "Печать",
        url:  `/print/${req.params.key}/${req.params.period}`
      }}
    ]
  }
}