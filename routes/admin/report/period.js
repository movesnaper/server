const {  getYear, getMonths, getMonth, getDays } = require('./functions')

module.exports = async (req, res, next) => {
  try {
    const date = req.date = req.company.settings.date
    const year = req.year = getYear(date)
    req.months = [...getMonths(year)]
    const month = req.month = req.query.month && getMonth(year, req.query.month)
    req.days = month && [...getDays(month)]
    next()
  } catch(e) {
    res.status(500).json({ period: e.message })
    console.log(e);
  }
}