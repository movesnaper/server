const { nano } = require('../../functions')
const db = nano.use('company')
  const get = (req, res) => {
    try {
      return db.get('values')
    } catch(e) {
      console.error(e);
      res.status(500).json(e)
    }
  }

  const post = async ({ body }, res) => {
    try {
      const { _id, _rev } = await db.get('values')
      return db.insert({...body, _id, _rev })
    } catch(e) {
      console.error(e);
      res.status(500).json(e)
    }
  }

  module.exports = { get, post }