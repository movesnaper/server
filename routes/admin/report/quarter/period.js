const { moment } = require('../functions')

module.exports = (req, res, next) => {
  if(!req.query.period) throw new Error('no period specified')
  try {
    const date = moment(req.company.settings.date)
    const quarter = date.quarter(req.query.period)
    req.quarter = {
      start: quarter.startOf('quarter'),
      end: quarter.endOf('quarter')
    }
    next()
  } catch(e) {
    console.error(e);
    res.status(500).json({ 'quarter-period': e.message })
  }
}