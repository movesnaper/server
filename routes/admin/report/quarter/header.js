
module.exports = async (req, res) => {
  const { periods } = require('./period')(req, res)
  return  {
    header: require(`../header`)(req.company),
    selector:  [ 
      { is: 'selector', attrs: { key: 'period', label: "Период", options: periods }},
      {},
      
      { col: 'col-2', is: 'print', attrs: { 
        label: "Печать",
        url:  `/print/${req.params.key}/${req.params.period}`
      }}
    ]
  }
}