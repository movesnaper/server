const express = require('express')
const router = express.Router()

router.get('/', 
  require('../period'),
  require('./header'),
  require('./payed'),
  require('./issued'),
  require('./values'),
  async ({ header, values }, res) => {
  res.json({ header, values })
})

module.exports = router