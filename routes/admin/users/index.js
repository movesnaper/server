const express = require('express')
const router = express.Router()
const { nano } = require('../../functions')
const db = nano.use('users')
const populate = ({doc}) => ({ ...doc, password: !!doc.password })
const update = async({key, id}, {value}) => {
  return db.insert({...await db.get(id), [key]: value}, id)
}


router.all('/password/:id?', async (req, res) => {
  res.status(500).json({ err: 'password'})
})

router.get('/', async (req, res) => {
  try {
      const {rows} = await db.list({include_docs: true})
      res.status(200).json(rows.filter(({doc}) => doc._id !== 'admin')
        .map(populate))
    } catch(e) {
      console.error(e);
      res.status(500).json(e)
    }
})
router.get('/:id', async (req, res) => {
    try {
        const doc = await db.get(req.params.id)
        res.status(200).json(populate({doc}))
      } catch(e) {
        console.error(e);
        res.status(500).json(e)
      }
})


router.post('/:key/:id', async ({params, body}, res) => {
  try {
    res.status(200).json(await update(params, body))
  } catch(e) {
    res.status(500).json(e)
  }
})

router.delete('/:id', async ({params, body}, res) => {
  try {
    res.status(200).json(await db.destroy(params.id, body._rev))
  } catch(e) {
    res.status(500).json(e)
  }
})

router.delete('/password/:id', async ({params, body}, res) => {
  try {
    await db.insert({...await db.get(params.id), password: undefined}, params.id)
    res.status(200).json()
  } catch(e) {
    res.status(500).json(e)
  }
})




module.exports = router