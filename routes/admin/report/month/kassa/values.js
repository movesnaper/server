const { values, limit } = require('../../selectors')
const { summ } = require('../../functions')
const accounts = ['377', '703', '704']

module.exports = async (req, res, next) => {
  try {
    const selector = values({ 
      lombard: req.query.lombard || { $exists: true }, 
      start: req.month.start, 
      end: req.month.end.add(1, 'd')
    })
    const { docs } = await req.db.find({ selector, fields: ['date', 'values'], limit})
    req.values = req.days.map((date) => {
      const values = docs.filter((v) => date.isSame(v.date, 'day'))
        .reduce((cur, { values }) => [...cur, ...values], [])
      const prixod = values.filter((v) => v.dt === '301' && !accounts.includes(v.ct)).reduce(summ, 0)
      const ct377 = values.filter((v) => v.dt === '301' && v.ct === '377').reduce(summ, 0)
      const ct703 = values.filter((v) => v.dt === '301' && v.ct === '703').reduce(summ, 0)
      const ct704 = values.filter((v) => v.dt === '301' && v.ct === '704').reduce(summ, 0)
      const totalDt = [prixod, ct377, ct703, ct704].map(summ => ({ summ })).reduce(summ, 0)
      const rasxod = values.filter((v) => v.ct === '301' && !accounts.includes(v.dt)).reduce(summ, 0)
      const dt377 = values.filter((v) => v.ct === '301' && v.dt === '377').reduce(summ, 0)
      const dt703 = values.filter((v) => v.ct === '301' && v.dt === '703').reduce(summ, 0)
      const totalCt = [rasxod, dt377, dt703].map(summ => ({ summ })).reduce(summ, 0)

      return {
        date,
        prixod,
        ct377,
        ct703,
        ct704,
        totalDt,
        rasxod,
        dt377,
        dt703,
        totalCt
      }
    }).map((v, i, arr) => { // maping ok
      const summTotals = (cur, { totalDt, totalCt }) => cur + totalDt - totalCt
      const ok = arr.filter(({ date }) => date.isSameOrBefore(v.date, 'day')).reduce(summTotals, req.ok)
      return {...v, ok}
    })
    next()
  } catch(e) {
    res.status(500).json({ values: e.message })
    console.log(e);
  }
}