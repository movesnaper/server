const { SITE_URL, COUCHDB, LOCALDB: local } = process.env
const url = SITE_URL + '/api'
const express = require('express')
const router = express.Router()
const { sign, docs } = require('../functions')

router.get('/', async ({ db, user: company }, res) => {
  const remote = `${COUCHDB}/${company}`
  const getToken = ({ _id: lombard }) => sign({ lombard, company, local, remote, url })
  const profile = v => ({...v, token: getToken(v)})  
  db.allDocs({ include_docs: true })
    .then(v => res.json(docs(v).map(profile)))
      .catch(err => console.log(err))
})

router.post('/', async ({ db, body}, res) => {
  // console.log(body);
  
  db.put({ _id: body.name, ...body })
    .then(v => res.json(v))
      .catch(err => console.log(err))
})

router.post('/remove', async ({ db, body }, res) => {
  db.put({ ...body, _deleted: true })
    .then(v => res.json(v))
        .catch(err => console.log(err))
})

module.exports =  router


