const { moment } = require('../functions')
const periods = [
  { key: 1, value: '1 квартал' },
  { key: 2, value: '2 квартал' },
  { key: 3, value: '3 квартал' },
  { key: 4, value: '4 квартал' }        
]
const years = [
  { key: 2021, value: '2021 г.'},
  { key: 2022, value: '2022 г.'},
]
module.exports = (req, res) => {
  try {
    const { period = 1, year } = req.query
    const { value } = periods.find((v) => v.key == period) || {}
    const quarter = period && moment(year).clone().quarter(period)
    const start = quarter && quarter.clone().startOf('quarter')
    const end = quarter && quarter.clone().endOf('quarter')
    return { value, periods, start, end, years }
  } catch(e) {
    console.error(e);
    res.status(500).json({ 'quarter-period': e.message })
  }
}