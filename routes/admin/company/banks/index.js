const {nanoid} = require('nanoid')
const get =  async ({ db, query }, res) => {
  try {
    const { rows } = await db.query(`company/banks`, {...query, include_docs: true})
    res.status(200).json(rows.map((v) => v.doc))
  } catch(e) {
    console.error(e);
    res.status(500).json(e)
  }
}

const post =  async ({ body, db }, res) => {
  try {
    const { _id, _rev, date } = body._id ? await db.get(body._id) : { _id: nanoid(10) }
    await db.put({...body, type: 'bank', _id, _rev, date: date || new Date() })
    res.status(200).json({ _id })
  } catch(e) {
    console.error(e);
    res.status(500).json(e)
  }
}
const remove =  async ({ db, body}, res) => {
  try {
    const value = await db.get(body._id)
    await db.put({...value, _deleted: true })
    res.status(200).json({ ok: true })
  } catch(e) {
    console.error(e);
    res.status(500).json(e)
  }
}

module.exports = { get, post, remove }