const { values, limit } = require('../../../../selectors')

module.exports = async (req, res, next) => {
  try {
    const docs = async(month) => {
      const {start, end}  = month.range('month')
      const selector = {...values({ start, end }), lombard: { $exists: true }}
      const {docs} = await req.db.find({ selector, limit })
      return {value: month.format('MM'), docs: docs.length}
    }
    req.periods = await Promise.all(req.months.map(docs))
    next()
  } catch(e) {
    console.error(e);
    res.status(500).json({ periods: e.message })    
  }
}