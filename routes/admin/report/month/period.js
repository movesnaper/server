const { moment } = require('../functions')

module.exports = (req, res, next) => {
  if(!req.query.period) throw new Error('no period specified')
  try {
    const date = req.date = moment(req.company.settings.date)
    const month = date.clone().month(req.query.period - 1)
    req.period = {
      start: month.clone().startOf('month'),
      end: month.clone().endOf('month'),
    }
    next()
  } catch(e) {
    console.error(e);
    res.status(500).json({ 'month-period': e.message })
  }
}