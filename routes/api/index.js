const express = require('express')
const router = express.Router()
const { COUCHDB_URI } = process.env
const PouchDB = require("pouchdb")
PouchDB.plugin(require('pouchdb-authentication'))
const db = new PouchDB(COUCHDB_URI +'/_users')
const { verify } = require('../functions')
const lombard = require('./lombard')

const session = async (req, res, next) => {
    db.getSession().then(({ userCtx }) => {
        const user = req.user = userCtx.name
        user ? next() : res.status(401).json('bad token')
    })
}
const token = async (req, res, next) => {
    
    verify(req.body.token).then(v => {
        req.body = v
        next()
    }).catch(err => res.status(400).json(err))
}

router.post('/activate', token, async ({ body }, res) => {
    const { id } = await lombard.post({ _id: body._id, active: true })
    const { name } = await lombard.get(id)
    
    res.json({ name, remote_url: COUCHDB_URI })
})
router.post('/register', async ({ body }, res) => {
    const { name, email, password } = body
    const metadata = { email }
    db.signUp(name, password, { metadata })
        .then(v => res.json(v))
            .catch(err => res.status(404).json(err))
})
router.post('/login', async ({ body }, res) => {
    const { email, password } = body
    db.logIn(email, password)
        .then(v => res.json(v))
            .catch(err => res.status(404).json(err))
})
router.post('/logout', async (req, res) => {
    db.logOut()
        .then(v => res.json(v))
            .catch(err => res.status(404).json(err))
})
router.get('/', session, async ({ user }, res) => {
    db.getUser(user)
        .then(v => res.json(v))
            .catch(err => res.status(404).json(err))
})
router.post('/',  session, ({ body }, res) => {})

router.use('/lombard', session, lombard.router)

module.exports = router