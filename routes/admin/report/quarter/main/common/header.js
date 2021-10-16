
module.exports = async (req, res) => {
  try {
    return [
      { row: 'border', children: [
        { col: 'col border', value: `Наименование финансового учреждения` },
        { col: 'col border', value: `ПО "ЛАЙТ-ЛОМБАРД"` },
      ]},
      { row: 'border', children: [
        { col: 'col border', value: `Наименование финансового учреждения` },
        { col: 'col border', value: `ПО "ЛАЙТ-ЛОМБАРД"` },
      ]},

  ]
  } catch(e) {
    console.error(e);
    res.status(500).json({ sign: e.message })
  }
}