const getSchema = async ({db}, res) => {
  try {
    const schema =  await require('./schema').get({ db, query: { key: 'schema'} })
    return (v) => Object.entries(v).filter(([key]) => !schema[key] || !schema[key].private)
      .reduce((cur, [key, value]) => {
        const body = schema[key] && schema[key].value 
        return {...cur, [key]: body ? new Function('value', body)(value) : value }
      }, {})
  } catch(e) {
    console.error(e);
    res.status(500).json(e)    
  }
}

const query = async (req, res) => {
  try {
    const { rows } = await req.db.query(`company/users`, {...req.query, include_docs: true})
    return rows.map((v) => v.doc)
  } catch(e) {
    console.error(e);
    res.status(500).json(e)
  }
}

const get = async (req, res) => {
  try {
    const schema = await getSchema(req, res)
    return req.query._id ? schema(await req.db.get(req.query._id)) : 
      (await query(req, res)).map(schema)
  } catch(e) { 
    console.error(e);
    res.status(500).json(e)
  }
}

const post =  async ({ body, db }, res) => {
  try {
    const { _id, _rev, date } = body._id ? await db.get(body.name) : { _id: body.name }
    return db.put({...body, type: 'user', _id, _rev, date: date || new Date() })
  } catch(e) {
    console.error(e);
    res.status(500).json(e)
  }
}

const remove =  async ({ db, body}, res) => {
  try {
    const value = await db.get(body._id)
    return db.put({...value, _deleted: true })
  } catch(e) {
    console.error(e);
    res.status(500).json(e)
  }
}

module.exports = { get, post, remove, query }