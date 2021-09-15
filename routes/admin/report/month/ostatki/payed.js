const { values, limit } = require('../../selectors')


module.exports = async (req, res, next) => {
  try {
    const selector = values({ 
      lombard: req.query.lombard || { $exists: true }, 
      end: req.period.end
    })

    const { docs } = await req.db.find({
      selector: { 
        ...selector,
        ref: { $exists: true }
      },
      fields: ['ref'],
      limit
    }) 

    req.payed = docs.map(v => v.ref)
    next()
  } catch(e) {
    res.status(500).json({ payed: e.message })
    console.log(e);
  }
}