const { COUCHDB, auth } = require('../../../functions')
const axios = require('axios')
const requestIp = require('request-ip');

const get = async (req, res) => {
  try {
    const reg = /\b\d{1,3}\.\d{1,3}\.\d{1,3}\.\d{1,3}\b/;
    const [clientIp] = requestIp.getClientIp(req).match(reg)
    const { data } = await axios.get(`${COUCHDB}/_users/_all_docs`, { auth })
    const rows = data.rows.map(v => v.key.split(':')[1]).filter(v => v)
    return rows.map((name) => ({ name, description: req.clientIp }))    
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