
const express = require('express')
const router = express.Router()

const reestr = {
  type: 'reestr',
  deleted: { $exists: false }
}

const values = async (req, res, next) => {
  try {
    const { start, end } = req.query
    const selector = { 
      ...reestr,
      date: { $gt: start, $lt: moment(end).add(1, 'd') }
    }
    const request = { 
      selector,
      fields: ['_id', 'date', 'days', 'values', 'klient', 'zalog'],
      limit: 10000 
    }
    req.values = (await db.find(request)).docs
      .reduce((cur, { _id, date, days, values, klient, zalog }) => {
        const issued = values.map((v) => ({...v, _id, date, days, klient, zalog }))
        return [...cur, ...issued]
      }, [])
    next()
  } catch({ message }) {
    res.status(404).json(message)
  }
}
const used = async (req, res, next) => {
  try {
    const { end } = req.query
    const selector = { ...reestr,
      ref: { $exists: true },
      date: { $lt: moment(end).add(1, 'd') }
    }
    const request = { 
      selector,
      fields: ['ref'],
      limit: 10000 
    }
    req.used = (await db.find(request)).docs.map(v => v.ref)
    next()
  } catch({ message }) {
    res.status(404).json(message)
  }
}



const company = async (req, res, next) => {
  try {
    req.company = await req.db.get('company')
    next()
  }catch(e) {
    res.status(401).json(e)
  }
}

router.get('/main', values, used, require('./main'))
router.get('/average', values, require('./average'))
router.get('/money', company, values, require('./money'))
router.get('/balance', company, values, require('./balance'))
// router.get('/ensuarance', request, require('./ensuarance'))
// router.get('/kassa:id', request, require('./kassa'))
// router.get('/ostatki/:id', request, require('./ostatki'))
// router.get('/penalty/:id', request, require('./penalty'))
// router.get('/fin-result/:id', request, require('./results'))

module.exports = router


