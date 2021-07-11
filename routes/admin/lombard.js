const express = require('express')
const router = express.Router()
const { sign, docs, reduce } = require('../functions')
const common = { limit: 10000 }

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
router.get('/warnigs', async ({ db }, res) => {

  const klients = reduce(await db.find({...common, 
    selector: { type: 'klient' },
    fields: ['_id', 'family', 'name', 'sername'],
  }))
  const result = (await db.find({...common, selector: {
    $or: [
      { deleted: { $exists: true } },
      { warning: { $exists: true } }
    ]
  }, 
    fields: ['_id', 'date', 'lombard', 'deleted', 'warning', 'klient', 'number', 'summ', 'values'],
  })).docs.map((v) => {
    const type = v.deleted ? 'deleted' : 'warning'
    const klient = klients[v.klient]
    const warning = v.warning || v.deleted
    return {...v, type, warning, klient }
  }).reduce((cur, v) => {
    const key = v.lombard
    const value = [...(cur[key] || []), v]
    return {...cur, [key]: value }
  }, {})
  res.json(result)
})

router.post('/', async ({ db, body}, res) => {
  const _id = body.name
  db.put({ _id, type: 'lombard', ...body })
    .then(v => res.json(v))
      .catch(({ status, name: message }) => {
        res.status(status).json({ message })
      })
})

router.post('/remove', async ({ db, body }, res) => {
  const remove = (v) => db.get(v)
    .then((v) => db.remove(v))
  Promise.all(body.map(remove))
    .then((v) => res.json(v))
      .catch(err => console.error(err))
})

module.exports =  router


