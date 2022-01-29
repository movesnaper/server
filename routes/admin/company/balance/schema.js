
  const get =  async ({ db, query }, res) => {
    try {
      const { rows } = await db.query(`company/schema`, {key: 'balance', include_docs: true})
      const [schema] = rows.map((v) => v.doc)
      return query.key ? schema[query.key] : schema
    } catch(e) {
      console.error(e);
      res.status(500).json(e)
    }
  }

  module.exports = { get }