const { values, limit } = require('../../selectors')


module.exports = async (req, res) => {
  const { end } = require('../period')(req, res)
  try {
    const selector = values({ 
      lombard: req.query.lombard || { $exists: true }, 
      end
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