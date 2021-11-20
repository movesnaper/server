const { moment } = require('../functions')
const periods = [
  { key: 1, value: '1 квартал' },
  { key: 2, value: '2 квартал' },
  { key: 3, value: '3 квартал' },
  { key: 4, value: '4 квартал' }        
]
module.exports = (req, res) => {
  try {
    const { value } = periods.find((v) => v.key == req.query.period || 1) || {}
    const date = req.date = moment(req.company.settings.date)
    const quarter = req.query.period && date.clone().quarter(req.query.period)
    const start = quarter && quarter.clone().startOf('quarter')
    const end = quarter && quarter.clone().endOf('quarter')
    return { value, periods, start, end }
  } catch(e) {
    console.error(e);
    res.status(500).json({ 'quarter-period': e.message })
  }
}