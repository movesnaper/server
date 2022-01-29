
  const get =  async ({ db, query }, res) => {
    try {
      const { rows } = await db.query(`company/schema`, {key: 'lombard', include_docs: true})
      const [schema] = rows.map((v) => v.doc)
      return schema[query.key]
    } catch(e) {
      console.error(e);
      res.status(500).json(e)
    }
  }

  module.exports = { get }