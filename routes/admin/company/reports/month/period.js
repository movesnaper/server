const { moment } = require('../functions')
const periods = [
  { key: 1, value: 'Январь'},
  { key: 2, value: 'Февраль'},
  { key: 3, value: 'Март'},
  { key: 4, value: 'Апрель'},
  { key: 5, value: 'Май'},
  { key: 6, value: 'Июнь'},
  { key: 7, value: 'Июль'},
  { key: 8, value: 'Август'},
  { key: 9, value: 'Сентябрь'},
  { key: 10, value: 'Октябрь'},
  { key: 11, value: 'Ноябрь'},
  { key: 12, value: 'Декабрь'}
]
module.exports = (req, res) => {
  const { period = 1 } = req.query
  const { value } = periods.find((v) => v.key == period) || {}
  try {
    const date = req.date = moment(req.company.settings.date)
    const month = period && date.clone().month(period - 1)
    return {
      value,
      periods,
      start: month && month.clone().startOf('month'),
      end: month && month.clone().endOf('month'),
    }
  } catch(e) {
    console.error(e);
    res.status(500).json({ 'month-period': e.message })
  }
}