const { values, limit } = require('../../selectors')
const { moment } = require('../../functions')

module.exports = async (req, res) => {
  const { start, end } = require('../period')(req, res)
  const penalty = (v) => {
    const vDate = (v) => moment(v.date).add(v.days, 'days')
    const diff = end.diff(vDate(v), 'days')
    return {...v, diff }
  }   
  try {
    const selector = values({ end })

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
      fields: ['date', 'days', 'number', 'ssuda', 'procent', 'xPen', 'zalog', 'values', 'klient', 'ocenca'],
      limit
    })
    return docs.filter((v) => v.values.length).map(penalty)
      .reduce((cur, value) => [...cur, ...value.values.map((v) => ({...value, ...v}))], [])
  } catch(e) {
    res.status(500).json({ credits: e.message })
    console.error(e);
  }
}