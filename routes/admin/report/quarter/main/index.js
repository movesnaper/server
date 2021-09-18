
const express = require('express')
const { toNumber } = require('../../functions')
const router = express.Router()

const toThousand = (v) => {
  const value = Math.round(v / 1000)
  return value || '-'
}

const filter = (v) => (key) => {
  const value = {
    'dt200': (v) => [v.dt].includes('200'),
    'dt301': (v) => [v.dt].includes('301'),
    'dt377': (v) => [v.dt].includes('377'),
    'ct301': (v) => [v.ct].includes('301'),
    'ct377': (v) => [v.ct].includes('377'),
    'ct703': (v) => [v.ct].includes('703'),
    'overDate': (v) => v.diff > 0,
    'beforeMonth': (v) => v.diff <= 31,
    'afterMonth': (v) => v.diff > 31,
    'gold': (v) => [v.zalog].includes('gold'),
    'things': (v) => ![v.zalog].includes('gold'),
  }
  return value[key](v)
}

const summ = (v, ...filters) => toThousand(v.filter((v) => filters.every(filter(v)))
  .reduce((cur, {summ}) => cur += toNumber(summ), 0))

const count = (v, ...filters) => {
  const value = v.filter((v) => filters.every(filter(v))).length
  return value || ''
}

const klients = (v) => {
  const value = [... new Set(v.map(v => v.klient))].length
  return value || ''
}

router.get('/',
require('../period'),
require('./values'),
require('./credits'),
require('./balance'),
async ({ company, values, credits, dt }, res) => {
  res.json({
      company,
      sell: {
        ssuda: summ(values, 'dt200', 'ct377'),
        procents: summ(values, 'dt200', 'ct703')
      },
      current: {
        ssuda: summ(values, 'dt377', 'ct301'),
        gold: {
          summ: summ(values, 'dt377', 'ct301', 'gold'),
          count: count(values, 'dt377', 'ct301', 'gold')
        },
        things: {
          summ: summ(values, 'dt377', 'ct301', 'things'),
          count: count(values, 'dt377', 'ct301', 'things')
        },
        procents: summ(values, 'dt301', 'ct703'),
        payed: summ(values, 'dt301', 'ct377'),
        count: count(values, 'dt377', 'ct301')
      },
      credits: {
        ssuda: summ(credits, 'dt377', 'ct301'),
        count: count(credits, 'dt377', 'ct301'),
        countBefore: count(credits, 'dt377', 'ct301', 'overDate', 'beforeMonth'),
        countAfter: count(credits, 'dt377', 'ct301', 'overDate', 'afterMonth'),
        overDate: summ(credits, 'dt377', 'ct301', 'overDate'),
        klients: klients(credits.filter((v) => ['dt377', 'ct301'].every(filter(v)))),
      },
      money: {
        '301': dt('301', toThousand),
        '311': dt('311', toThousand)
      }
  })
})

module.exports = router