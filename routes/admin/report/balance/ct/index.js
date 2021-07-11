const {summ} = require('../../functions')

module.exports = async ({ company, values }) => {
  const dt = values.filter((v) => v.dt === '311')
  const ct = values.filter((v) => v.ct === '311')

  return {
    start: 0,
    dt: Math.round(dt.reduce(summ, 0) / 1000),
    ct: Math.round(ct.reduce(summ, 0) / 1000),
    end: 0
  }
}
