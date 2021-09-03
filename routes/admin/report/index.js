
const express = require('express')
const {moment} = require('./functions')
const router = express.Router()

const reestr = {
  type: 'reestr',
  deleted: { $exists: false }
}

const values = async (req, res, next) => {
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
  try {
    req.values = (await req.db.find(request)).docs
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
    req.used = (await req.db.find(request)).docs.map(v => v.ref)
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
router.use('/kassa', company, require('./period'), require('./kassa'))
router.use('/ostatki', require('./ostatki'))
router.use('/penalty', require('./penalty'))
router.use('/fin-result', require('./fin-result'))

module.exports = router


