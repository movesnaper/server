// const { moment } = require('../../functions')
module.exports = async ({ query, db }, res) => {
  try {
    const data = await db.query(`account/values`, {
      key: query.value,
    })
    res.json({ test: 'test', query, data })
  } catch(e) {
    console.error(e);
  }
  }