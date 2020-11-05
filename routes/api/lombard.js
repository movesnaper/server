const express = require('express')
const router = express.Router()
const { sign, docs } = require('../functions')

router.get('/', async ({ db, user: company }, res) => {
  const getToken = ({ _id: lombard }) => sign({ lombard, company })
  const profile = v => ({...v, token: getToken(v)})  
  db.allDocs({ include_docs: true })
    .then(v => res.json(docs(v).filter(v => v.type === 'lombard').map(profile)))
      .catch(err => console.log(err))
})

router.post('/', async ({ db, body}, res) => {
  const _id = body.name
  db.put({ _id, type: 'lombard', ...body })
    .then(v => res.json(v))
      .catch(err => console.log(err))
})

router.post('/remove', async ({ db, body }, res) => {
  db.put({ ...body, _deleted: true })
    .then(v => res.json(v))
        .catch(err => console.log(err))
})

module.exports =  router


