// const bcrypt = require('bcrypt');
// const saltRounds = 10;
const express = require('express')
const router = express.Router()
const { docs } = require('../functions')


router.get('/', async ({ db }, res) => {
  db.allDocs({ include_docs: true })
    .then(v => res.json(docs(v).filter(v => v.type === 'user')))
      .catch(err => console.error(err))
})

router.post('/', async ({ db, body}, res) => {  
  db.put({...body, _id: body.name, type: 'user' })
    .then(v => res.json(v))
      .catch(({ status, name: message }) => {
        res.status(status).json({ message })
      })
})

router.post('/remove', async ({ db, body }, res) => {
  db.put({ ...body, _deleted: true })
    .then(v => res.json(v))
        .catch(err => console.error(err))
})

module.exports = router


