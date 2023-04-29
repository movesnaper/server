const { nano } = require('../../../functions')
const db = nano.use('lombards')
const query = async (req, res) => {
  try {
    const { rows } = await db.list({include_docs: true})
    return rows.map((v) => v.doc)
  } catch(e) {
    console.error(e);
    res.status(500).json(e)
  }
}

const get = async (req, res) => {
  try {
    return req.query._id ? await req.db.get(req.query._id) : await query(req, res)
  } catch(e) {
    console.error(e);
    res.status(500).json(e)
  }
}

const post = async ({ body, db }, res) => {
  try {
    const { _id, _rev, date } = body._id ? await db.get(body._id) : { _id: nanoid(10) }
    return db.put({...body, type: 'lombard', _id, _rev, date: date || new Date() })
  } catch(e) {
    console.error(e);
    res.status(500).json(e)
  }
}

const remove = async ({ db, body}, res) => {
  try {
    const value = await db.get(body._id)
    return db.put({...value, _deleted: true })
  } catch(e) {
    console.error(e);
    res.status(500).json(e)
  }
}

module.exports = { get, post, remove }