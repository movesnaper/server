const {moment, summ} = require('../../functions')

module.exports = async ({ values, used, query }) => {
  const issued = values.filter((v) => v.dt === '377')
  const credits = issued.filter(({ _id }) => !used.includes(_id))
  const overDate = credits.filter(({ date, days }) => 
    moment(query.end).diff(moment(date), 'days') >= Number(days))
  return {
    issued: Math.round(issued.reduce(summ, 0) / 1000),
    credits: Math.round(credits.reduce(summ, 0) / 1000),
    overDate: Math.round(overDate.reduce(summ, 0) / 1000),
  }
}
