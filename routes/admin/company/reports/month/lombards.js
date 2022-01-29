const { lombard, limit } = require('../selectors')

module.exports = async (req, res) => {
  try {
    const { docs } = await req.db
      .find({ selector: lombard(), fields: ['_id', 'name', 'title', 'kod'], limit })
    return docs
  } catch(e) {
    console.error(e);
    res.status(500).json({ 'lombards': e.message })
  }
}