
const get =  async ({ db, query }, res) => {
  try {
      const {rows } = await db.query(`lombard/warnings`, query)
      res.status(200).json(rows.map((v) => v.value))
    } catch(e) {
      console.error(e);
      res.status(500).json(e)
    }
  }

  const remove =  async ({ body, db}, res) => {
    try {
      const remove = async (id) => {
        const value = await db.get(id)
        return db.put({...value, _deleted: !!value.deleted, warning: undefined})
      }
      await Promise.all(body.map(remove))
      res.status(200).json({ ok: true })
    } catch(e) {
        console.error(e);
        res.status(500).json(e)
    }
  }

  module.exports = { remove, get }