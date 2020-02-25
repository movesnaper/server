const express = require('express')
const router = express.Router()
const { sign } = require('../functions')

router.get('/', async ({ body }, res) => {
  const { company_id } = body
  const profile = ({ id: lombard_id, profile }) => ({
    ...profile, token: sign({ lombard_id, company_id })
  })
  const lombards = await Lombard.get()
  res.json(lombards.map(profile))
})

router.post('/', async ({body}, res) => {
  res.json( await Lombard.save(body))
})

router.post('/remove', async ({body}, res) => {
  const {id} = body
  res.json(await Lombard.remove(id))
})

module.exports =  router


