const { nano } = require('../../functions')
const db = nano.use('company')
  const get =  async (req, res) => {
    try {
      return db.get('menu')
    } catch(e) {
      console.error(e);
      res.status(500).json(e)
    }
  }

  module.exports = { get }