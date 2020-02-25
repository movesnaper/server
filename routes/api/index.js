const express = require('express')
const router = express.Router()
const { verify, conn: connection } = require('../functions')

const company = async (req, res, next) => {
    try {
        const { id } = verify(req.headers['x-token'])
        req.company_id = id
        next() 
    } catch(err) {
        res.status(401).json('bad token')
    }
}

const conn = [company, connection]

router.post('/register', ({body}, res) => {
    Company.save(body)
        .then(() => res.json('ok'))
            .catch(err => res.status(400).json(err))
})

router.post('/login',  ({ body }, res) => {    
    Company.findOne({ email: body.email })
        .then(({ sign }) => res.json(sign))
            .then((company) => company.verify(body.password))
                .catch(err => res.status(400).json(err))
})

router.get('/', company, async ({ company_id }, res) => {
    Company.findById(company_id)
        .then((company) => res.json(company.profile))
            .catch(err => res.status(400).json(err))
})

router.post('/',  company, ({ body, company_id }, res) => {
    Company.save({ ...body, company_id })
        .then(() => res.json('ok'))
            .catch(err => res.status(400).json(err))
})

router.use('/lombard', conn, require('./lombard'))
router.use('/user', conn, require('./user'))

module.exports = router;