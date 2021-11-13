const { find } = require('../../selectors')
const { summ, moment, toDouble } = require('../../functions')
const dt = (...acc) => (v) => v.dt === '301' && !acc.length || acc.includes(v.ct)
const ct = (...acc) => (v) => v.ct === '301' && !acc.length || acc.includes(v.dt)
const accounts = (key) => (v) => !['377', '703', '704'].includes(v[key])

const get = async (req, res) => {
  const startOk = await require('./ok')(req, res)
  const { start, end } = require('../period')(req, res)
  try {
    const { docs } = await find(req.db)({ 
      fields: ['date', 'values'],
      selector: { start, end, lombard: req.query.lombard }
    })
    const range = moment().range(start, end)
    const values = [...range.by('days')].map((date) => {
      const values = docs.filter((v) => date.isSame(v.date, 'day'))
        .reduce((cur, { values }) => [...cur, ...values], [])
      const prixod = values.filter(dt()).filter(accounts('ct')).reduce(summ, 0)
      const ct377 = values.filter(dt('377')).reduce(summ, 0)
      const ct703 = values.filter(dt('703')).reduce(summ, 0)
      const ct704 = values.filter(dt('704')).reduce(summ, 0)
      const totalDt = [prixod, ct377, ct703, ct704]
        .map((summ) => ({ summ })).reduce(summ, 0)
      const rasxod = values.filter(ct()).filter(accounts('dt')).reduce(summ, 0)
      const dt377 = values.filter(ct('377')).reduce(summ, 0)
      const dt703 = values.filter(ct('703')).reduce(summ, 0)
      const totalCt = [rasxod, dt377, dt703]
        .map((summ) => ({ summ })).reduce(summ, 0)
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
    }).map((v, i, arr) => {
      const total = (cur, value) => cur += value.ok
      const ok = arr.filter(({ date }) => 
        date.isSameOrBefore(v.date, 'day')).reduce(total, startOk)
      return {...v, ok: toDouble(ok), date: v.date.format('DD.MM.YYYY')}
    })
    res.status(200).json({
      values: [ { ok: toDouble(startOk) }, ...values ],
      footer: require('./footer')(values)
    })
  } catch(e) {
    res.status(500).json({ values: e.message })
    console.log(e);
  }
}

module.exports = { get }