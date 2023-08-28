const express = require('express')
const router = express.Router()
const { nano, docs, sign } = require('../../functions')
const  populate = async (data) => {
  return { name: data._id }
}
const db = nano.use('lombards')

router.get('/', async (req, res) => {
    try {
        const {rows} = await db.list({include_docs: true})
        res.status(200).json(rows.map(populate))
      } catch(e) {
        console.error(e);
        res.status(500).json(e)
      }
})

router.get('/:id?', async ({params}, res) => {
  try {
      const value = await db.get(params.id)
      res.status(200).json(value)
    } catch(e) {
      console.error(e);
      res.status(500).json(e)
    }
})

router.post('/activate/:id', async ({params}, res) => {
  try {
    const data = await db.get(params.id)
    const token = !data.token ? await sign(data, populate) : undefined
    await db.insert({...data, token}, params.id)
    res.status(200).json()
  } catch(e) {
    res.status(500).json(e)
  }
})

router.post('/:id', async ({params, body}, res) => {
  try {
    res.status(200).json(await db.insert(body, params.id))
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


module.exports = router