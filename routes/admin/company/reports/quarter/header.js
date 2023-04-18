
module.exports = async (req, res) => {
  const { periods, years } = require('./period')(req, res)
  return  {
    years,
    periods,
    header: [
      { children: [
        { col: 'col border', value: `Наименование финансового учреждения`},
        { col: 'col border', value: req.company.title }
      ]},
      { children: [
        { col: 'col border', value: `Код финансового учреждения`},
        { col: 'col border', value: req.company.kod}
      ]}
    ]
  }
}