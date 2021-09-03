const express = require('express')
const router = express.Router()
const Moment = require('moment')
const extendMoment = require('moment-range').extendMoment
const limit = 10000
const moment = extendMoment(Moment)
const format = 'YYYY-MM-DD'
const getYear = (year) => {
  const date = moment()
  return moment(date.year(), 'YYYY')
}
const monthRange = ({ year, month }) => {
  return getYear(year).month(month - 1).range('month')
}

const selector = (lombard, type = 'reestr') => {
  return {
    deleted: { $exists: false },
    type,
    lombard
  }
}



router.get('/:id', async ({ db, params, query }, res) => {
  const range = monthRange(query)
  const { docs: used } = await db.find({
    selector: { ...selector(params.id),
      ref: { $exists: true },
      date: { $lt: range.end }
  },
    fields: ['ref'],
    limit
  })
  const { docs: klients } = await db.find({
    selector: {
      type: 'klient',
  },
    fields: ['_id', 'family', 'name', 'sername'],
    limit
  })
  const usedRefs = used.map(v => v.ref)
  const { docs } = await db.find({
    selector: { ...selector(params.id), 
      date: { $lt: moment(range.end).add(1, 'd') },
      ref: { $exists: false },
      number: { $exists: true },
  },
    fields: ['_id', 'date', 'number', 'obespechenie', 'klient', 'ocenca'],
    limit
  })
  const result = docs.filter(v => !usedRefs.includes(v._id))
  result.sort(({ number: a = 0 }, { number: b = 0 } ) => Number(a) - Number(b))
  const items = result.reduce((cur, v, index ) => {
    const obespechenie = (v.obespechenie || [])
      .map((obespechenie, i) => {
        const { family = '', name = '', sername = '' } = klients.find(({ _id }) => _id === v.klient) || {}
        const klient = `${family} ${name.charAt(0)}. ${sername.charAt(0)}.`
        const date = v.date ? moment(v.date).format('L') : ''
        const value = { date, number: v.number, ssuda: v.ocenca, klient }
        return !i ? { ...obespechenie, ...value, index: index + 1 } : obespechenie
      })
    return [...cur, ...obespechenie ]
  }, [])
  res.json(items)
})



module.exports = router