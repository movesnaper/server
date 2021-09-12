const { lombard, limit } = require('../selectors')

module.exports = async (req, res, next) => {
  try {
    const lombards = ({ _id: value, name: text, title }) => ({ value, text, title })
    const { docs } = await req.db.find({ selector: lombard(), fields: ['_id', 'name', 'title'], limit })
    req.lombard = { key: 'lombard', values: docs.map(lombards), noSelected: 'Все ломбарды' }    
    next()
  } catch(e) {
    console.error(e);
    res.status(500).json({ 'schema-lombard': e.message })    
  }
}