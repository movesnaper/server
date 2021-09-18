const express = require('express')
const router = express.Router()

router.get('/',
  require('../period'),
  require('./payed'),
  require('./issued'),
  require('./klients'), 
  require('./values'),
  async ({ values }, res) => {
    res.json(values)
})

module.exports = router