const query = async (db, params) => {
  const { rows = [] } = await db.query(`account/values`, params) || {}
  return rows.map((v) => v.value)
}

const get = async (req, res) => {
  try {
    return query(req.db, { key: req.query.key })
  } catch(e) {
    console.error(e);
  }
}

const post = async ({ body, db }, res) => {
  try {
    const method = body._id ? db.put : db.post
    await method({ ...body, type: 'account' })
    return { message: 'Успешно сохранено' }
  } catch(e) {
    console.error(e)
    res.status(e.status).json({ message: e.message })
  }
}

module.exports = { get, post, query }