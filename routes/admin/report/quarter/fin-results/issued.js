const { values, limit } = require('../../selectors')
const { toNumber, moment } = require('../../functions')

const penalty = (date) => (v) => {
  const vDate = (v) => moment(v.date).add(v.days, 'days')
  const diff = date.diff(vDate(v), 'days')
  const penalty = toNumber(v.ssuda) * toNumber(v.xPen) / 100 * diff
  return {...v, diff, penalty, count: 1 }
} 
module.exports = async (req, res, next) => {
  try {
    const getValues = async (date) => {
      const selector = values({ lombard: req.query.lombard || { $exists: true } , end: date })
      const payed = (await req.db.find({
        selector: { ...selector, ref: { $exists: true } },
        fields: ['ref'],
        limit
      })).docs.filter(v => v.ref)
      const { docs } = await req.db.find({
        selector: { ...selector, days: { $exists: true }, 
        // _id: { $nor: payed } 
      },
        fields: ['date', 'days', 'number', 'ssuda', 'procent', 'xPen', 'zalog'],
        limit
      })
      return docs.map(penalty(date))
    }

    req.issued = { 
      start: await getValues(req.month.start),
      end: await getValues(req.month.end)
    }
    next()
  } catch(e) {
    res.status(500).json({ issued: e.message })
    console.error(e);
  }
}