const { values, limit } = require('../../selectors')
const { toNumber, moment } = require('../../functions')

module.exports = async (req, res) => {
  const { start, end } = require('../period')(req, res)
  try {
    const getValues = async (start, end) => {
      const selector = values({ lombard: req.query.lombard || { $exists: true } , start, end })

      const { docs } = await req.db.find({
        selector,
        fields: ['values', 'zalog', 'ocenca', 'procent'],
        limit
      })
      return docs.reduce((cur, v) => {
        return [...cur, ...v.values.map((value) => {
          const ssuda = [value.dt, value.ct].includes('377') && toNumber(value.summ)
          const procent = [value.dt, value.ct].includes('703') && (value.ct === '703' ? toNumber(value.summ) : toNumber(value.summ) * -1)
          const penalty = [value.ct].includes('704') && toNumber(value.summ)
          const income = toNumber(procent) + toNumber(penalty)
          return {...v, ...value, ssuda, procent, penalty, income }
        })]
      }, [])
    }
    return { 
      start: await getValues(moment(req.date), end),
      end: await getValues(start, end)
    }
  } catch(e) {
    res.status(500).json({ issued: e.message })
    console.error(e);
  }
}