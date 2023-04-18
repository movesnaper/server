const { values, limit } = require('../../selectors')


module.exports = async (req, res) => {
  try {
    const selector = values({ 
      lombard: req.query.lombard || { $exists: true }, 
      end: req.query.date
    })

    const { docs } = await req.db.find({
      selector: { 
        ...selector,
        ref: { $exists: true }
      },
      fields: ['ref'],
      limit
    }) 

    return docs.map(v => v.ref)
  } catch(e) {
    res.status(500).json({ payed: e.message })
    console.log(e);
  }
}