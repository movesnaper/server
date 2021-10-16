const { lombard, limit } = require('../selectors')

module.exports = async (req, res) => {
  try {
    const { docs } = await req.db
      .find({ selector: lombard(), fields: ['_id', 'name', 'title', 'kod'], limit })
    return docs
    // .map((v) => ({ key: v._id, name: v.name, title: v.title }))
  } catch(e) {
    console.error(e);
    res.status(500).json({ 'lombards': e.message })
  }
}