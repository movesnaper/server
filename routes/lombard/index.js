const express = require('express')
const router = express.Router()
const { verify, conn: connection } = require('../functions')
var PouchDB = require('pouchdb')
var Auth = require('pouchdb-auth')
PouchDB.plugin(Auth)
const db = new PouchDB('http://admin:Stalker01@91.235.129.14:5984/_users')
db.useAsAuthenticationDB()

const lombard = (req, res, next) => {
    try {
        const { lombard_id, company_id } = verify(req.headers['x-token'])
        req.lombard_id = lombard_id
        req.company_id = company_id
        next() 
    } catch(err) {
        res.status(401).json('bad token')
    }
}

const conn = [lombard, connection]

const user = async (req, res, next) => {
    try {
        const { id } =  verify(req.headers['x-user'])
        req.user_id = id
        next()
    } catch(err) {
        res.status(401).json('bad token')
    }
}

router.get('/', conn, ({ lombard_id }, res) => {
    Lombard.getProfile(lombard_id)
        .then(v => res.json(v))
            // .catch(err => res.status(400).json(err))
})

router.post('/login', conn, ({ body }, res) => {    
    db.signUp(body.email, body.password)
        .catch(err => console.log(err))
    User.findOne({ email: body.email })
        .then((user) => user.verify(body.password))
            .then(({ sign }) => res.json(sign))
                .catch(err => res.status(400).json(err))
})

router.use('/user', conn, user, require('./user'))
router.use('/klient', conn, user, require('./klient'))
router.use('/bilet', conn, user, require('./bilet'))
router.use('/reestr', conn, user, require('./reestr'))

module.exports =  router