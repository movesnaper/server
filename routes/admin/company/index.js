const express = require('express')
const router = express.Router()
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

router.get('/:id?', async (req, res) => {
  try {
      res.status(200).json(await db.get(req.params.id))
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


module.exports = router