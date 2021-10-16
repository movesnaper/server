
const express = require('express')
const router = express.Router()

const company = async (req, res, next) => {
  try {
    req.company = await req.db.get('company')
    next()
  }catch(e) {
    res.status(401).json(e)
  }
}

router.get('/', company, require('./schema'))
router.use('/kassa', require('./month/kassa'))
router.use('/ostatki', require('./month/ostatki'))
router.use('/penalty', require('./month/penalty'))
router.use('/main', require('./quarter/main'))
router.use('/fin-results', require('./quarter/fin-results'))


module.exports = router


