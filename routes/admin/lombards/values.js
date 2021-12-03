
  const get =  async ({ db, query }, res) => {
    try {
      const { rows } = await db.query(`lombard/values`, query)
      res.status(200).json(rows.map((v) => v.value))
    } catch(e) {
      console.error(e);
      res.status(500).json(e)
    }
  }

  const post =  async ({ body, db }, res) => {
    try {
      await db.put(body)
      res.status(200).json({ ok: true })
    } catch(e) {
      console.error(e);
      res.status(500).json(e)
    }
  }
  const remove =  async (req, res) => {
    // const remove = async (id, index) => {
    //   const value = await req.db.get(id)
    //   value.values.splice(index, 1)
    //   return req.db.put(value)
    // }
    // const result = await Promise.all(req.body.values.map(async (v) => await remove(...v.split('/'))))
    res.status(200).json({ result })
  }

  module.exports = { get, post, remove }