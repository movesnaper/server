const express = require('express')
const router = express.Router()
const { newPouchDb } = require('../functions')
const db = newPouchDb()

const session = async (req, res, next) => {
  const { userCtx } = await db.getSession()
    // const user = userCtx.name
    const user = 'po-light'
    if (!user || user === 'admin') return res.status(401).json('auth_user_requred')
    req.user = user
    // console.log(user);
    
    req.db = newPouchDb(user)
    next()
}

router.post('/register', async ({ body }, res) => {
    const { name, email, password } = body
    db.signUp(name, password, { metadata: { email } })
        .then(v => res.json(v))
            .catch(err => res.status(404).json(err))
})
router.post('/login', async ({ body }, res) => {
    const {  email, password } = body
    db.logIn(email, password).then(v => res.json(v))
            .catch(err => res.status(404).json(err))
})
router.post('/logout', async (req, res) => {
    db.logOut().then(v => res.json(v))
        .catch(err => res.status(404).json(err))
})
router.get('/profile', session, async ({ user }, res) => {
    db.getUser(user).then(v => res.json(v))
        .catch(err => res.status(401).json(err))
})
router.get('/', session, async ({ db }, res) => {
    db.allDocs({ include_docs: true })
    .then(v => res.json(v))
      .catch(err => console.log(err))
})

router.use('/lombard', session, require('./lombard'))
router.use('/user', session, require('./user'))
router.use('/klients', session, require('./klient'))
router.use('/reestr', session, require('./reestr'))

module.exports = router