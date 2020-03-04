const express = require('express')
const router = express.Router()
const { newPouchDb } = require('../functions')
const db = newPouchDb()

const session = async (req, res, next) => {
    const { userCtx } = await db.getSession()
    const user = req.user = userCtx.name
    user ? next() : res.status(401).json('auth_user_requred')
}
const useUrl = (name = '') => [session, (req, res, next) => {
    req.db = newPouchDb(req.user + name)
    req.user !== 'admin' ? next() : res.status(401).json('auth_user_requred')
}]

router.post('/activate', async ({ body }, res) => {
    verify(body.token).then((v) => {
        console.log(v)
        res.json(v)      
    }).catch(err => res.status(404).json(err))
})

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

router.use('/lombard', useUrl(), require('./lombard'))
router.use('/user', useUrl('_user'), require('./user'))
router.use('/klients', useUrl('_klient'), require('./klient'))
router.use('/reestr', useUrl('_reestr'), require('./reestr'))

module.exports = router