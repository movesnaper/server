
const {toDouble, toNumber, moment, $_} = require('../../../../functions')
const getDate = (date) => moment(date)
const getYear = (date) => moment(getDate(date).year(), 'YYYY')
const getQuarters = (year) => moment(year).range('year').by('quarters')
const getMonths = (year) => moment(year).range('year').by('months')
const getMonth = (year, month) => year.month(month - 1).range('month')
const getDays = (range) => range.by('days')
const summ = (cur, v) => cur += toNumber(v.summ)
const toThousand = (v) => Math.round(v / 1000)

module.exports = {
  moment,
  toDouble,
  toNumber,
  $_,
  getDate,
  getYear,
  getQuarters,
  getMonths,
  getMonth,
  getDays,
  summ,
  toThousand
}