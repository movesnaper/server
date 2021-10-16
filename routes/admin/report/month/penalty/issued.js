const { values, limit } = require('../../selectors')
const { toNumber, moment } = require('../../functions')

const penalty = (date) => (v) => {
  const vDate = (v) => moment(v.date).add(v.days, 'days')
  const diff = date.diff(vDate(v), 'days')
  const penalty = diff > 0 && toNumber(v.ssuda) * toNumber(v.xPen) / 100 * diff
  return {...v, diff, penalty, count: 1 }
} 
module.exports = async (req, res) => {
  const { start, end  } = require('../period')(req, res)
  try {
    const getValues = async (date) => {
      const selector = values({ lombard: req.query.lombard || { $exists: true } , end: date })

      const { docs: payed } = await req.db.find({
        selector: { ...selector, ref: { $exists: true } },
        fields: ['ref'],
        limit
      })

      const { docs } = await req.db.find({
        selector: { ...selector, 
          ref: { $exists: false },
          number: { $exists: true },
          _id: { $nor: payed.map(v => v.ref) } 
        },
        fields: ['date', 'days', 'number', 'ssuda', 'procent', 'xPen', 'zalog'],
        limit
      })
      return docs.map(penalty(date)).filter((v) => v.penalty)
    }

    return { 
      start: await getValues(start),
      end: await getValues(end)
    }
  } catch(e) {
    res.status(500).json({ issued: e.message })
    console.error(e);
  }
}