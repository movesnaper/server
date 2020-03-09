
const express = require('express')
const router = express.Router()
const { docs } = require('../functions')


router.get('/', async ({ db }, res) => {
  db.allDocs({ include_docs: true })
    .then(v => res.json(docs(v).filter(v => v.type === 'user')))
      .catch(err => console.log(err))
})

router.post('/', async ({ db, body}, res) => {  
  const _id = `org.couchdb.user:${body.name}` 
  db.put({ _id, type: 'user', ...body })
    .then(v => res.json(v))
      .catch(err => console.log(err))
})

router.post('/remove', async ({ db, body }, res) => {
  db.put({ ...body, _deleted: true })
    .then(v => res.json(v))
        .catch(err => console.log(err))
})

module.exports = router


