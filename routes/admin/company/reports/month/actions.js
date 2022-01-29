module.exports = async (req, res) => {
  try {
    return [
      ...require('../actions'),
      { key: 'lombard', 'text-field': 'name', 'value-field': 'key',
        options: [
          { key: null, name: 'Все ломбарды' }, 
          ...await require('../lombards')(req, res)
        ]
      }
    ]
  } catch(e) {
    console.error(e);
    res.status(500).json({ 'month-actions': e.message })
  }
}