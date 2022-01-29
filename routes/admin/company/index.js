const express = require('express')
const router = express.Router()
const dirLevel = '/:p1?/:p2?/:p3?/:p4?/:p5?'


router.get(dirLevel, async (req, res) => {
  const path = Object.values(req.params).filter((v) => v).join('/')
  res.status(200).json(await require(`./${path}`).get(req, res))
})

router.post(dirLevel, async (req, res) => {
  const path = Object.values(req.params).filter((v) => v).join('/')
  res.status(200).json(await require(`./${path}`).post(req, res))
})

router.delete(dirLevel, async (req, res) => {
  const path = Object.values(req.params).filter((v) => v).join('/')
  res.status(200).json(await require(`./${path}`).remove(req, res))
})

module.exports = router