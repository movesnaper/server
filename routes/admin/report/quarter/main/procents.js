const {summ} = require('../../functions')

module.exports = async ({ values }) => {
  const procents = values.filter((v) => v.ct === '703').reduce(summ, 0)
  const payed = values.filter((v) => v.dt === '703').reduce(summ, 0)
  return Math.round((procents - payed) / 1000)
}
