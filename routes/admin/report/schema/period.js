const {  getYear, getQuarters, getMonths, moment } = require('../functions')

const months = [
  'Январь',
  'Февраль',
  'Март',
  'Апрель',
  'Май',
  'Июнь',
  'Июль',
  'Август',
  'Сентябрь',
  'Октябрь',
  'Ноябрь',
  'Декабрь',
]

const quarters = [
  '1 квартал',
  '2 квартал',
  '3 квартал',
  '4 квартал',
]

module.exports = (req, res, next) => {
  try {
    // const year = getYear(req.company.settings.date)
    const date = moment(req.company.settings.date)
    // const monthPeriod = (month) => {
    //   const { end }  = year.month().range('month')
    //   const value = month.format('MM')
    //   const title = `По состоянию на ${end.format('DD.MM.YYYY')} г.`
    //   return { value, text: months[value], title }
    // }
    const period = (key, getIndex = (i) => i) => (text, i) => {
      const end  = date[key](getIndex(i)).endOf(key)
      const title = `По состоянию на ${end.format('DD.MM.YYYY')} г.`
      return { value: i + 1, text, title }
    }
    req.month = months.map(period('month'))
    req.quarter = quarters.map(period('quarter', (i) => i + 1))
    next()
  } catch(e) {
    console.error(e);
    res.status('500').json({ 'schema-period': e.message })
  }
}