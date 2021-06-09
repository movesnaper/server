
const express = require('express')
const router = express.Router()
const numberFormat = require('../../functions/numberFormat')
const Moment = require('moment')
const extendMoment = require('moment-range').extendMoment
const limit = 10000
const moment = extendMoment(Moment)
const toNumber = (v) => Number(numberFormat(v || 0, 2, '.', ''))
const toDouble = (v) => numberFormat(v, 2, '.', ' ')
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

const getSumm = (values = []) => {
  return values.reduce((cur, { dt, ct, summ } = {}) => {
    const dt301 = dt === '301' ? toNumber(summ) : 0
    const ct301 = ct === '301' ? toNumber(summ) : 0
    return cur + dt301 - ct301
  }, 0)
}

router.get('/kassa/ok/:id', async ({ db, params, query }, res) => {
  const range = monthRange(query)
  const [{ accounts = {} }] = (await db.find({
    selector: { type: 'lombard', name: params.id },
    fields: ['accounts'],
    limit
  })).docs || []
  const { summ = 0 } = (accounts.dt || []).find(v => v.acc = '301') || {}
  const { docs } = await db.find({
    selector: { ...selector(params.id), 
      date: {
        $gte: accounts.date,
        $lt: range.start.format(format) 
      }
    },
    fields: ['values'],
    limit
  })
  const result = docs.reduce((cur, { values }) => cur + getSumm(values), toNumber(summ))
  res.json(toDouble(result))
})

router.get('/kassa/:id', async ({ db, params, query }, res) => {
  const accounts = ['377', '703', '704']
  const range = monthRange(query)
  const days = [ ...range.by('days')]
  const { docs } = await db.find({
    selector: {
      ...selector(params.id), 
      date: {
        $gt: range.start.format(format),
        $lt: moment(range.end).add(1, 'd').format(format)
      }
    },
    fields: ['date', 'values'],
    limit
  })
  const result = days.map(date => {
    const values = docs.filter(v => date.isSame(v.date, 'day'))
      .reduce((cur, { values }) => {
        return [...cur, ...values]
      }, [])
    const prixod = values.filter((v) => {
      return v.dt === '301' && !accounts.includes(v.ct)
    })
      .reduce((cur, v) => cur + toNumber(v.summ), 0)
    const ct377 = values.filter((v) => {
      return v.dt === '301', v.ct === '377'
    })
      .reduce((cur, v) => cur + toNumber(v.summ), 0)
    const ct703 = values.filter((v) => v.ct === '703')
      .reduce((cur, v) => cur + toNumber(v.summ), 0)
    const ct704 = values.filter((v) => v.ct === '704')
      .reduce((cur, v) => cur + toNumber(v.summ), 0)
    const totalDt = prixod + ct377 + ct703 + ct704

    const rasxod = values.filter((v) => {
      return v.ct === '301' && !accounts.includes(v.dt)
    })
      .reduce((cur, v) => cur + toNumber(v.summ), 0)
    const dt377 = values.filter((v) => v.dt === '377')
      .reduce((cur, v) => cur + toNumber(v.summ), 0)
    const dt703 = values.filter((v) => v.dt === '703')
      .reduce((cur, v) => cur + toNumber(v.summ), 0)
    const dt704 = values.filter((v) => v.dt === '704')
      .reduce((cur, v) => cur + toNumber(v.summ), 0)
    const totalCt = rasxod + dt377 + dt703 + dt704

    return {
      date: date.format('DD.MM.YYYY'),
      values,
      prixod: toDouble(prixod),
      ct377: toDouble(ct377),
      ct703: toDouble(ct703),
      ct704: toDouble(ct704),
      totalDt: toDouble(totalDt),
      
      rasxod: toDouble(rasxod),
      dt377: toDouble(dt377),
      dt703: toDouble(dt703),
      // dt704: toDouble(dt704),
      totalCt: toDouble(totalCt),
    }
  })
  res.json(result)
})

router.get('/ostatki/:id', async ({ db, params, query }, res) => {
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

router.get('/penalty/:id', async ({ db, params, query }, res) => {
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
router.get('/fin-result/:id', async ({ db, params, query }, res) => {
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

router.get('/', async ({ db, params, query }, res) => {
  const { docs } = await db.find({
    selector: {
      deleted: { $exists: false },
      // date: {
      //   $gte: query.start,
      //   $lte: query.end
      // }
    },
    fields: ['values', 'type'],
    limit
  })
  const values = docs.filter((v) => v.values)
    .reduce((cur, v) => [...cur, ...v.values], [])
    
  const klients = docs.filter((v) => v.type ==='klient').length
  const users = docs.filter((v) => v.type ==='user').length
  const lombards = docs.filter((v) => v.type ==='lombard').length
  const issued = values.filter((v) => v.dt === '377').length
  const payed = values.filter((v) => v.ct === '377').length
  const pendings = issued - payed

  res.json({
    klients,
    users,
    lombards,
    issued,
    payed,
    pendings
  })
})

module.exports = router


