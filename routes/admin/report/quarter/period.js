const { moment } = require('../functions')

module.exports = (req, res, next) => {
  if(!req.query.period) throw new Error('no period specified')
  try {
    const date = req.date = moment(req.company.settings.date)
    const quarter = date.clone().quarter(req.query.period)
    req.period = {
      start: quarter.clone().startOf('quarter'),
      end: quarter.clone().endOf('quarter')
    }
    next()
  } catch(e) {
    console.error(e);
    res.status(500).json({ 'quarter-period': e.message })
  }
}