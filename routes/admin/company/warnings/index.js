
const get =  async ({ db, query }, res) => {
  try {
    const { rows } = await db.query(`company/warnings`, {...query, include_docs: true})
    return rows.map((v) => v.doc)
  } catch(e) {
    console.error(e);
    res.status(500).json(e)
  }
}

const remove =  async ({ db, body}, res) => {
  try {
    const clear = async (id) => {
      const value = await db.get(id)
      return db.put({...value, _deleted: !!value.deleted, warning: undefined})
    }
    await Promise.all(body.map(clear))
    return { ok: true }
  } catch(e) {
    console.error(e);
    res.status(500).json(e)
  }
}

module.exports = { get, remove }