const { lombard, values, limit } = require('../../../../selectors')

module.exports = async (req, res, next) => {
  try {
    const docs = async (lombard) => {
      const {docs} = await req.db.find({ selector: values({ lombard: lombard._id, start: req.date }), limit })
      return {...lombard, docs: docs.length}
    }
    const lombards = await req.db.find({ selector: lombard(), fields: ['_id', 'name', 'title'], limit })
    req.lombards = await Promise.all(lombards.docs.map(docs))
    next()
  } catch(e) {
    console.error(e);
    res.status(500).json({ lombards: e.message })    
  }
}