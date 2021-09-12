const { getYear, getMonths, getMonth, getDays } = require('../functions')

module.exports = (req, res, next) => {
  if(!req.query.period) throw new Error('no period specified')
  try {
    const date = req.date = req.company.settings.date
    const year = req.year = getYear(date)
    req.months = [...getMonths(year)]
    const month = req.month = getMonth(year, req.query.period)
    req.days = [...getDays(month)]
    next()
  } catch(e) {
    console.error(e);
    res.status(500).json({ 'month-period': e.message })
  }
}