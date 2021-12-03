const express = require('express')
const router = express.Router()
const dirLevel = '/:p1?/:p2?/:p3?'


router.get(dirLevel, (req, res) => {
  const path = Object.values(req.params).filter((v) => v).join('/')
  return require(`./${path}`).get(req, res)
})

router.post(dirLevel, (req, res) => {
  const path = Object.values(req.params).filter((v) => v).join('/')
  return require(`./${path}`).post(req, res)
})

router.delete(dirLevel, (req, res) => {
  const path = Object.values(req.params).filter((v) => v).join('/')
  return require(`./${path}`).remove(req, res)
})

module.exports = router