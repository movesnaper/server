const express = require('express')
const router = express.Router()
const dirLevel = '/:p1?/:p2?/:p3?'

const company = async (req, res, next) => {
  try {
    req.company = await req.db.get('company')
    next()
  } catch(e) {
    res.status(401).json(e)
  }
}

router.get(dirLevel, (req, res) => {
  const path = Object.values(req.params).filter((v) => v).join('/')
  return require(`./${path}`).get(req, res)
})

router.post(dirLevel, company, (req, res) => {
  const path = Object.values(req.params).filter((v) => v).join('/')
  return require(`./${path}`).post(req, res)
})

router.delete(dirLevel, (req, res) => {
  const path = Object.values(req.params).filter((v) => v).join('/')
  return require(`./${path}`).remove(req, res)
})

module.exports = router