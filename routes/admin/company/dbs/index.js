const { nano } = require('../../../functions')
const users = nano.use('users')
const admin = ({doc}) => (doc.roles || []).includes('admin')
const active = ({doc}) => !!doc.active

const get = async (req, res) => {
  try {
    const { rows } = await users.list({include_docs: true})
    return rows.filter(active).filter(admin).map(v => v.doc)   
  } catch(e) {
    console.error(e);
    res.status(500).json(e)
  }
}

const post = async ({ db, body }, res) => {
  const { name, doc_ids } = body || {}
  const err = `replicate to same name: ${name}`
  const { db_name } = await db.info()
  if (db_name === name) return res.status(500).json({ massage: err })
  await newPouchDb(name).destroy()
  db.replicate.to(newPouchDb(name), { doc_ids })
    .then(() => res.json({ ok: true }))
      .catch(err => console.error(err))
}

module.exports = { get, post }