
module.exports = async (req, res) => {
  const { periods } = require('./period')(req, res)
  return  {
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