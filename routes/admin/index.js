const express = require('express')
const router = express.Router()

router.get('/', async (req, res) => {
  res.status(200).json(await require('./company/dbs').get(req, res))
})
router.use('/auth', require('./auth'))
router.use('/company', require('./company/index.js'))
router.use('/schema', require('./schema/index.js'))
router.use('/lombards', require('./lombards/index.js'))
router.use('/programs', require('./programs/index.js'))
router.use('/users', require('./users/index.js'))




module.exports = router