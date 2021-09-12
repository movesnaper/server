const {summ} = require('../../functions')

module.exports = async ({ values }) => {
  const payed = values.filter((v) => v.ct === '377').reduce(summ, 0)
  return Math.round(payed / 1000)
}
