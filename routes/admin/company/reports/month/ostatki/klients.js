const { klient, limit } = require('../../selectors')

module.exports = async (req, res) => {
  try {
    const { docs } = await req.db.find({ 
      selector: klient(), 
      fields: ['_id', 'family', 'name', 'sername'], 
      limit 
    })
    return docs
  } catch(e) {
    console.log(e);
    res.status(500).json({ klients: e.message })
  }
}