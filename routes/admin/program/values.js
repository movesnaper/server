// const { } = require('../../functions')

const get =  async ({ db }, res) => {
  try {
    const data = await db.query(`program/values`)
    const rows = data.rows.map(({ value}) => value)
      res.status(200).json(rows)
    } catch(e) {
      console.error(e);
      res.status(500).json(e)
    }
  }
  const post =  async ({ company, body, db }, res) => {
    try {
      const program = {...company.program, versions: body }
      await db.put({...company, program})
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