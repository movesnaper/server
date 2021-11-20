
module.exports = (req, res) => {
  const { value: period } = require('./period')(req, res)
  try {
    return [
      { row: 'my-3', children: [
        { col: 'center-text', is: 'strong', value: `По состоянию на ${period || ''}`}
      ]},
      ...require('../headers')(req.company),
      !period && [noPeriod]
    ]
  } catch(e) {
    res.status(500).json({ 'header': e.message })
    console.error(e);
  }
}