const nano = require('nano')('http://185.98.87.225:5984')
const lombards = nano.db.use('lombards')

const express = require('express')
const router = express.Router()
const { sign } = require('../functions')

const profile = ({ _id, name, active }) => ({
  _id, name, active, token: sign({ _id })
})

router.get('/', async ({ }, res) => {
    const docs = await lombards.list({ include_docs: true })
    .then(({ rows }) => rows.map(v => v.doc))
    res.json(docs.map(profile))
})

router.post('/', async ({ body }, res) => {
  const { _rev } = {...await lombards.get(body._id) }
  const { id } = await lombards.insert({...body, _rev })
  res.json(id)
})

router.post('/remove', async ({ body }, res) => {
  const { _id, _rev } = {...await lombards.get(body._id) }
  res.json(await lombards.destroy(_id, _rev))
})

module.exports =  router


