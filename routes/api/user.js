
const express = require('express')
const router = express.Router()
const { docs } = require('../functions')

const profile = ({ _id, name, active, email }) =>
  ({ _id, name, active, email })


router.get('/', async ({ db }, res) => {
  db.allDocs({ include_docs: true })
    .then(v => res.json(docs(v).map(profile)))
      .catch(err => console.log(err))
})

router.post('/', async ({ db, body}, res) => {
  db.put({ _id: body.name, ...body })
    .then(v => res.json(v))
      .catch(err => console.log(err))
})

router.post('/remove', async ({ db, body }, res) => {
  db.put({ ...body, _deleted: true })
    .then(v => res.json(v))
        .catch(err => console.log(err))
})

module.exports = router


