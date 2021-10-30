const { moment } = require('../../functions')
module.exports = async ({ body, db }, res) => {
  const { page = 0, limit = 10, where } = body
  const skip = Number(limit) * Number(page)
  try {
    const data = await db.query(`my_index/${where.target}`, {
      startkey: where.startkey,
      endkey: where.endkey,
      descending: true,
      include_docs: true,
      limit: Number(limit),
      skip
    })
    const rows = data.rows.map(({ value, doc}) => {
      const date = moment(doc.date).format('DD.MM.YYYY')
      return {...doc, value: {...value, date } }
    })

    res.json({ rows, total: data })
  } catch(e) {
    console.error(e);
  }
  }