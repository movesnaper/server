const express = require('express')
const router = express.Router()
const { sign, docs } = require('../functions')


router.get('/', async ({ db, user: company }, res) => {
  const getToken = ({ _id: lombard, program = {} }) => {
    const {local, remote} = program
    return sign({ lombard, company, local, remote })
  }
  const profile = v => {
    return {...v, token: getToken(v)}
  } 
  db.allDocs({ include_docs: true })
    .then(v => res.json(docs(v).filter(v => v.type === 'lombard').map(profile)))
      .catch(err => console.error(err))
})

router.post('/', async ({ db, body}, res) => {
  const _id = body.name
  db.put({ _id, type: 'lombard', ...body })
    .then(v => res.json(v))
      .catch(err => console.error(err))
})

router.post('/remove', async ({ db, body }, res) => {
  db.put({ ...body, _deleted: true })
    .then(v => res.json(v))
        .catch(err => console.error(err))
})

module.exports =  router


