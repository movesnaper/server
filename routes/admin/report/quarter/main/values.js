const { values, limit } = require('../../selectors')

module.exports = async (req, res, next) => {
  try {
    const selector = values({
      start: req.period.start,
      end: req.period.end,
    })

    const { docs } = await req.db.find({
      selector,
      fields: ['_id', 'date', 'values', 'zalog'],
      limit
    })

    req.values = docs.filter((v) => v.values.length).reduce((cur, value) => {
      const values = value.values.map((v) => ({...value, ...v}))
      return [...cur, ...values]
    }, [])

    next()
  } catch(e) {
    res.status(500).json({ values: e.message })
    console.error(e);
  }
}