
  const get = (req, res) => {
    try {
      return req.db.get('company')
    } catch(e) {
      console.error(e);
      res.status(500).json(e)
    }
  }

  const post = async ({ body, db }, res) => {
    try {
      const { _id, _rev } = await db.get('company')
      return db.put({...body, type: 'company', _id, _rev })
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
  }

  module.exports = { get, post, remove }