const express = require('express')
const router = express.Router()
const dirLevel = '/:p1?/:p2?/:p3?/:p4?/:p5?'
const { nano, keyValue } = require('../../functions')
const db = nano.use('company')

router.get('/', async (req, res) => {
  try {
      const {rows} = await db.list({include_docs: true})
      res.status(200).json(rows.reduce(keyValue, {}))
    } catch(e) {
      console.error(e);
      res.status(500).json(e)
    }
})

router.post('/:id', async ({params, body}, res) => {
  try {
    res.status(200).json(await db.insert({...body, _id: params.id}))
  } catch(e) {
    res.status(500).json(e)
  }
})

// router.get(dirLevel, async (req, res) => {
//   const path = Object.values(req.params).filter((v) => v).join('/')
//   res.status(200).json(await require(`./${path}`).get(req, res))
// })

// router.post(dirLevel, async (req, res) => {
//   const path = Object.values(req.params).filter((v) => v).join('/')
//   res.status(200).json(await require(`./${path}`).post(req, res))
// })

router.delete(dirLevel, async (req, res) => {
  const path = Object.values(req.params).filter((v) => v).join('/')
  res.status(200).json(await require(`./${path}`).remove(req, res))
})

module.exports = router