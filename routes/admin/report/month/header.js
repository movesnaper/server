
module.exports = async (req, res) => {
  const { periods } = require('./period')(req, res)
  const lombards = await require('./lombards')(req, res)
  const queryLombard = (key) => [
    lombards.reduce((cur, v) => ({...cur, [v._id]: v[key]}), { undefined: req.company[key]}),
    '$route.query.lombard'
  ]
  const queryPeriod = [
    periods.reduce((cur, { key, value }) => ({...cur, [key]: value}), { undefined: ''}),
    '$route.query.period'
  ]
  return  {
    header: [
      { children: [
        { col: 'col border', value: `Наименование финансового учреждения`},
        { col: 'col border', value: { get: queryLombard('title') }}
      ]},
      { children: [
        { col: 'col border', value: `Код финансового учреждения`},
        { col: 'col border', value: { get: queryLombard('kod') }}
      ]}
    ],
    selectors:  [ 
      { col: 'col', is: 'selector', attrs: { key: 'period', label: "Период", options: periods }},
      { col: 'col', is: 'selector', attrs: { key: 'lombard', options: [
          { key: null, value: 'Все ломбарды'},
          ...lombards.map((v) => ({ key: v._id, value: v.name }))
        ]}
      }
    ],
    period: [ 
      { col: 'mx-2', value: 'По состоянию на' },
      { col: 'mx-2', value: { get: queryPeriod }}
    ]
  }
}