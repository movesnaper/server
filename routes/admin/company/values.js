  const get =  async ({ db }, res) => {
    try {
      const company = await db.get(`company`)
      res.status(200).json(company)
    } catch(e) {
      console.error(e);
      res.status(500).json(e)
    }
  }

  const post =  async ({ body, db }, res) => {
    console.log(body);
    // try {
    //   await db.put(body)
    //   res.status(200).json({ ok: true })
    // } catch(e) {
    //   console.error(e);
    //   res.status(500).json(e)
    // }
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