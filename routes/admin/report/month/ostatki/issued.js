const { values, limit } = require('../../selectors')
const byNumber = ({ number: a = 0 }, { number: b = 0 } ) => Number(a) - Number(b)

module.exports = async (req, res, next) => {
  try {
    const selector = values({ 
      lombard: req.query.lombard || { $exists: true }, 
      end: req.period.end
    })
    const { docs } = await req.db.find({
      selector: { 
        ...selector,
        ref: { $exists: false },
        number: { $exists: true },
        _id: { $nor: req.payed }
      },
      fields: ['_id', 'date', 'number', 'obespechenie', 'klient', 'ocenca'],
      limit
    })
    req.issued = docs.sort(byNumber).map((v, i) => ({...v, index: i + 1 }))
    next()
  } catch(e) {
    res.status(500).json({ issued: e.message })
    console.error(e);
  }
}