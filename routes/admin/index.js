const express = require('express')
const bcrypt = require('bcrypt')

const router = express.Router()
const { newPouchDb, COUCHDB, auth } = require('../functions')
const db = newPouchDb()
const requestIp = require('request-ip');
const axios = require('axios')

const session = async (req, res, next) => {
  const { userCtx } = await db.getSession()
  const user = userCtx.name
  if (!user || user === 'admin') return res.status(401).json('auth_user_requred')
  req.user = user
  req.db = newPouchDb(user)
  next()
};

const company = async (req, res, next) => {
  try {
    req.company = await req.db.get('company')
    next()
  }catch(e) {
    res.status(401).json(e)
  }
}

const ipMiddleware = function(req, res, next) {
  const r = /\b\d{1,3}\.\d{1,3}\.\d{1,3}\.\d{1,3}\b/;
  const [clientIp] = requestIp.getClientIp(req).match(r)
  req.clientIp = clientIp
  next();
};

router.post('/register', async ({ body }, res) => {
    const { name, password } = body
    // db.signUp(name, password, { metadata: { email: name } })
  db.signUp(name, password)
    .then(v => res.json(v))
      .catch(err => res.status(404).json(err))
})

router.post('/login', async ({ body }, res) => {
  const { company = 'klients', user } = body
  const db = newPouchDb(company)
  try {
    const [{ password } = {} ] = (await db.find({ selector: { name: user.name }, fields: ['password']})).docs
    if (!password) throw { name: 'user_not_found'}
    const match = await bcrypt.compare(user.password, password)
    if (!match) throw { password: 'incorect_password'}
    res.json(await db.logIn(company, auth.password))
  } catch(err) {
    res.status(404).json(err)
  }
})
router.post('/logout', (req, res) => {
  db.logOut().then(v => res.json(v))
    .catch(err => res.status(404).json(err))
})

router.get('/', session, async ({db}, res) => {
    db.allDocs({ include_docs: true })
    .then(v => res.json(v))
      .catch(err => console.error(err))
})

router.get('/dbs', ipMiddleware, async ({ clientIp }, res) => {
  const { data } = await axios.get(`${COUCHDB}/_users/_all_docs`, { auth });
  const rows = data.rows.map(v => v.key.split(':')[1]).filter(v => v)
  res.json(rows.map(name => {
    return { name, description: clientIp }
  }))
})

router.post('/replicate', session, async ({ db, body }, res) => {
    const { name, doc_ids } = body || {}
    const err = `replicate to same name: ${name}`
    const { db_name } = await db.info()
    if (db_name === name) return res.status(500).json({ massage: err })
    await newPouchDb(name).destroy()
    db.replicate.to(newPouchDb(name), { doc_ids })
      .then(() => res.json({ ok: true }))
        .catch(err => console.error(err))
})

router.use('/profile', session, require('./profile'))
router.use('/company', session, require('./company'))
// router.use('/lombard', session, require('./lombard'))
router.use('/lombards', session, require('./lombards'))
router.use('/user', session, require('./user'))
router.use('/klients', session, require('./klient'))
router.use('/reestr', session, require('./reestr'))
router.use('/report', session, company, require('./report'))
router.use('/program', session, company, require('./program'))

module.exports = router