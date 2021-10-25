// const selector = { type: 'reestr', deleted: { $exists: false } }
// const fields = ['_id', 'date', 'values', 'lombard', 'number', 'order', 'description']
module.exports = async ({ body, db }, res) => {
  const { page = 0, limit = 10 } = body
  const skip = Number(limit) * Number(page)
  try {
    // await db.createIndex({ index: { fields: ['date'] }})
    // const result = await db.find({ selector, fields, sort: [{ date: 'desc' }], limit: Number(limit), skip })

    const result = await db.query('my_index/values_dt', {
      startkey: ['377'],
      endkey: ['377', {}],
      // descending: true,
      include_docs: true,
      limit: Number(limit),
      sort: [{ date: 'desc' }],
      skip
    })


    res.json(result)
  } catch(e) {
    console.error(e);
  }
  }