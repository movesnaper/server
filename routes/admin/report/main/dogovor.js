const {moment} = require('../functions')

module.exports = async ({ values, used, query }) => {
  const diff = (func) => ({ date, days }) => {
    const total = moment(query.end).diff(moment(date), 'days') + Number(days)
    return func(total - Number(days))
  }
  const issued = values.filter((v) => v.dt === '377')
  const credits = issued.filter(({ _id }) => !used.includes(_id))
  const before = credits.filter(diff(days => days <= 31))
  const after = credits.filter(diff(days => days > 31))
  const klients = [...new Set(credits.map(v => v.klient))]
  return {
    count: credits.length,
    before: before.length,
    after: after.length,
    klients: klients.length,
    issued: issued.length,
  }
}
