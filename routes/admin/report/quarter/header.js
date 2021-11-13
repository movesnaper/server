
module.exports = async (req, res) => {
  const { periods } = require('./period')(req, res)
  const queryPeriod = [
    periods.reduce((cur, { key, value }) => ({...cur, [key]: value}), { undefined: ''}),
    '$route.query.period'
  ]
  return  {
    header: [
      { children: [
        { col: 'col border', value: `Наименование финансового учреждения`},
        { col: 'col border', value: req.company.title }
      ]},
      { children: [
        { col: 'col border', value: `Код финансового учреждения`},
        { col: 'col border', value: req.company.kod}
      ]}
    ],
    selectors:  [ 
      { is: 'selector', attrs: { key: 'period', label: "Период", options: periods }},
    ],
    period: [ 
      { col: 'mx-2', value: 'По состоянию на' },
      { col: 'mx-2', value: { get: queryPeriod }}
    ]
  }
}