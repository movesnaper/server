const { values, limit } = require('../../selectors')


module.exports = async (req, res, next) => {
  try {
    const selector = values({ 
      lombard: req.query.lombard || { $exists: true }, 
      end: req.period.end.add(1, 'd')
    })
    const { docs } = await req.db.find({
      selector: { 
        ...selector,
        // ref: { $exists: false },
        number: { $exists: true },
        _id: { $nor: req.payed }
      },
      fields: ['_id', 'date', 'number', 'obespechenie', 'klient', 'ocenca'],
      limit
    }) 
    req.issued = docs
    next()
  } catch(e) {
    res.status(500).json({ issued: e.message })
    console.log(e);
  }
}