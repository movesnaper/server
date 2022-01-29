const {  toDouble, toNumber } = require('../../functions')
const strong = 'font-weight: 600;'

module.exports = (values) => [    
    'prixod',
    'ct377',
    'ct703',
    'ct704',
    'totalDt',
    'dt377',
    'dt703',
    'rasxod',
    'totalCt'
  ].reduce((cur, key) => {
    const value = values.reduce((cur, v) => cur += toNumber(v[key]), 0)
    return { ...cur, [key]: { style: strong, value: toDouble(value) } }
  }, {})