const { values, limit } = require('../../selectors')
const { summ, moment, toDouble } = require('../../functions')
const accounts = ['377', '703', '704']

module.exports = async (req, res, next) => {
  try {
    const selector = values({ 
      lombard: req.query.lombard || { $exists: true }, 
      start: req.period.start, 
      end: req.period.end
    })
    const { docs } = await req.db.find({ selector, fields: ['date', 'values'], limit})
    const range = moment().range(req.period.start, req.period.end)
    req.values = [...range.by('days')].map((date, i, arr) => {
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
        prixod: toDouble(prixod),
        ct377: toDouble(ct377),
        ct703: toDouble(ct703),
        ct704: toDouble(ct704),
        totalDt: toDouble(totalDt),
        rasxod: toDouble(rasxod),
        dt377: toDouble(dt377),
        dt703: toDouble(dt703),
        totalCt: toDouble(totalCt),
        ok: totalDt - totalCt
      }
    })
    .map((v, i, arr) => {
      const total = (cur, value) => cur += value.ok
      const ok = arr.filter(({ date }) => date.isSameOrBefore(v.date, 'day')).reduce(total, req.ok)
      return {...v, ok: toDouble(ok), date: v.date.format('DD.MM.YYYY')}
    })
    next()
  } catch(e) {
    res.status(500).json({ values: e.message })
    console.log(e);
  }
}