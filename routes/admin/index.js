const express = require('express')
const router = express.Router()
const { newPouchDb } = require('../functions')

const session = async (req, res, next) => {
  const db = newPouchDb()
  const { userCtx } = await db.getSession()
  const user = userCtx.name
  if (!user || user === 'admin') 
    return res.status(401).json('auth_user_requred')
  req.db = newPouchDb(user)
  next()
}

const company = async (req, res, next) => {
  req.company = await req.db.get('company')
  if (!req.company) 
    return res.status(500).json('company_requred')
  next()
}

router.get('/', async (req, res) => {
  res.status(200).json(await require('./company/dbs').get(req, res))
})
router.use('/auth', require('./auth'))
router.use('/company', session, company, require('./company/index.js'))


module.exports = router