const { lombard, values, limit } = require('../../selectors')
const { toNumber } = require('../../functions')

const getSumm = (values = []) => {
  return values.reduce((cur, { dt, ct, summ } = {}) => {
    const dt301 = dt === '301' ? toNumber(summ) : 0
    const ct301 = ct === '301' ? toNumber(summ) : 0
    return cur += (dt301 - ct301)
  }, 0)
}

module.exports = async (req, res) => {
  const { start } = require('../period')(req, res)
  try {
    const { lombard: id } = req.query
    const lombards = id ? [{ _id: id }] : (await req.db.find({ selector: lombard(), fields: ['_id'], limit })).docs
    const summ = lombards.reduce((cur, { _id }) => {
      return cur +=  toNumber(req.company.settings.dt.find((v) => v.key === `301/${_id}`).summ)
    }, 0)
    const selector = values({lombard: id || { $exists: true }, start: req.date, end: start })
    const { docs } = await req.db.find({ selector, fields: ['values'], limit })
    return docs.reduce((cur, { values }) => cur += getSumm(values), summ)
  } catch(e) {
    console.log(e);
    res.status(500).json({ ok: e.message })
  }
}