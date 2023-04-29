const express = require('express')
const bcrypt = require('bcrypt')

const router = express.Router()
const { newPouchDb, COUCHDB, auth } = require('../functions')
const db = newPouchDb()

const session = async (req, res, next) => {
  const { userCtx } = await db.getSession()
  const user = userCtx.name
  if (!user) return res.status(401).json('auth_user_requred')
  req.user = user
  req.db = newPouchDb(user)
  next()
};


router.post('/register', async ({ body }, res) => {
    const { name, password } = body
    // db.signUp(name, password, { metadata: { email: name } })
  db.signUp(name, password)
    .then(v => res.json(v))
      .catch(err => res.status(404).json(err))
})

router.post('/login', async ({ body }, res) => {
  // const { company = 'klients', user } = body
  const db = newPouchDb('klients')
  console.log(body);
  // try {
  //   const [{ password } = {} ] = (await db.find({ selector: { name: user.name }, fields: ['password']})).docs
  //   if (!password) throw { name: 'user_not_found'}
  //   const match = await bcrypt.compare(user.password, password)
  //   if (!match) throw { password: 'incorect_password'}
  //   res.json(await db.logIn(company, auth.password))
  // } catch(err) {
  //   res.status(404).json(err)
  // }
})
router.post('/logout', (req, res) => {
  db.logOut().then(v => res.json(v))
    .catch(err => res.status(404).json(err))
})

router.get('/', session, async ({db}, res) => {
  console.log("test")
    db.allDocs({ include_docs: true })
    .then(v => res.json(v))
      .catch(err => console.error(err))
})

module.exports = router