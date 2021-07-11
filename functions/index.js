
const Moment = require('moment')
const extendMoment = require('moment-range').extendMoment
const numberFormat = require('./numberFormat')

const moment = extendMoment(Moment)

const toNumber = (v) => Number(numberFormat(v || 0, 2, '.', ''))

const toDouble = (v) => numberFormat(v, 2, '.', ' ')

const getYear = () => moment(moment().year(), 'YYYY')

const monthRange = ({ year, month }) => getYear(year).month(month - 1).range('month')


 module.exports = {
  format: 'YYYY-MM-DD',
  moment,
  toNumber,
  toDouble,
  getYear,
  monthRange,
 }