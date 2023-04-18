
module.exports = async (req, res) => {
  const { periods, years } = require('./period')(req, res)
  const lombards = await require('./lombards')(req, res)
  const queryLombard = (key) => [
    lombards.reduce((cur, v) => ({...cur, [v._id]: v[key]}), { undefined: req.company[key]}),
    '$route.query.lombard'
  ]
  return  {
    periods,
    years,
    lombards: [
      { key: null, value: 'Все ломбарды'},
      ...lombards.map((v) => ({ key: v._id, value: v.name }))
    ],
    header: [
      { children: [
        { col: 'col border', value: `Наименование финансового учреждения`},
        { col: 'col border', value: { get: queryLombard('title') }}
      ]},
      { children: [
        { col: 'col border', value: `Код финансового учреждения`},
        { col: 'col border', value: { get: queryLombard('kod') }}
      ]}
    ]
  }
}