const express = require('express')
const router = express.Router()
const {numberFormat} = require('../../../../functions')
const Moment = require('moment')
const extendMoment = require('moment-range').extendMoment
const limit = 10000
const moment = extendMoment(Moment)
const toNumber = (v) => Number(numberFormat(v || 0, 2, '.', ''))
const toDouble = (v) => numberFormat(v, 2, '.', ' ')


const selector = (lombard, type = 'reestr') => {
  return {
    deleted: { $exists: false },
    type,
    lombard
  }
}

router.get('/:id', async ({ db, params, query }, res) => {
  const date = moment(query.date)
  const { docs: used } = await db.find({
    selector: { ...selector(params.id),
      ref: { $exists: true },
      date: { $lt: query.date }
  },
    fields: ['ref'],
    limit
  })
  const usedRefs = used.map(v => v.ref)
  const { docs } = await db.find({
    selector: { ...selector(params.id),
      date: { $lte: query.date },
      days: { $exists: true },
      _id: { $nor: usedRefs }
  },
    fields: ['date', 'days', 'number', 'ssuda', 'procent', 'xPen', 'zalog'],
    limit
  })
  const values = docs.map(v => {
    const vDate = (v) => moment(v.date).add(v.days, 'days')
    const diff = date.diff(vDate(v), 'days')
    const penalty = toDouble(toNumber(v.ssuda) * toNumber(v.xPen) / 100 * diff)
    return {...v, diff, penalty }
  }).filter(v => v.diff > 0)
  res.json(values)
})


module.exports = router