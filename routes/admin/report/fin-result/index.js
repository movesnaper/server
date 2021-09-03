const express = require('express')
const router = express.Router()
const {numberFormat} = require('../../../../functions')
const limit = 10000
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
  const { docs } = await db.find({
    selector: {
      ...selector(params.id), 
      date: {
        $gte: query.start,
        $lte: query.end
      }
    },
    fields: ['values', 'zalog', 'ocenca', 'procent'],
    limit
  })
  const values = docs.reduce((cur, v) => {
    return [...cur, ...v.values.map((value) => {
      return {...v, ...value}
    })]
  }, [])
  const summ = (values, key = 'summ') => {
    return values.reduce((cur, v) => {
      return cur + toNumber(v[key])
    }, 0)
  }
  const issued = values.filter((v) => v.dt ==='377')
  const payed = values.filter((v) => v.ct ==='377')
  const procentPayed = values.filter((v) => v.dt ==='703')
  const penalty = values.filter((v) => v.ct ==='704')
  const result = {
    issuedGold: toDouble(summ(issued.filter((v) => v.zalog === 'gold'))),
    issuedThings: toDouble(summ(issued.filter((v) => v.zalog === 'things'))),
    issuedOcenka: toDouble(summ(issued.filter((v) => v.zalog === 'things'), 'ocenca')),
    payedByMoney: toDouble(summ(payed.filter((v) => v.dt === '301'))),
    payedBySale: toDouble(summ(payed.filter((v) => v.dt === '200'))),
    procentIssued: toDouble(summ(issued, 'procent')),
    procentPayed: toDouble(summ(procentPayed) * -1 ),
    penalty: toDouble(summ(penalty)),
    issuedGoldCount: issued.filter((v) => v.zalog === 'gold').length,
    issuedThingsCount: issued.filter((v) => v.zalog === 'things').length,
    payedBySaleCount: payed.filter((v) => v.dt === '200').length,
    rent: '-'
  }
  res.json(result)
})

module.exports = router