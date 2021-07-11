const {toNumber, moment} = require('../../../functions')

const summ = (cur, v) => cur + toNumber(v.summ)

module.exports = {
  moment,
  summ
}