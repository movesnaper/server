
const express = require('express')
const { summ } = require('../../functions')
const router = express.Router()
const type = 'reestr'
const selector = { type, deleted: { $exists: false } }
const request = { selector,
  fields: ['_id', 'date', 'values', 'lombard', 'number', 'order', 'description'],
  limit: 10000
}

router.get('/', async ({ db }, res) => {
  db.allDocs({ include_docs: true })
    .then(v => res.json(v))
      .catch(err => console.error(err))
})

router.get('/values', async ({ db, query }, res) => {
  const { page = 0, limit = 10 } = query
  const skip = Number(limit) * Number(page)
  try {
    await db.createIndex({ index: { fields: ['date'] }})
    const result = await db.find({ ...request, sort: [{ date: 'desc' }], limit: Number(limit), skip })
    res.json({ ...result, page })
  } catch(e) {
    res.status(e.status).json(e)
  }
})

router.get('/balance', async ({ db, query }, res) => {
  const { start, end } = query
  const date = { $gte: start }
  try {
    const { dt, ct } = (await db.get('company')).settings
    const accounts = [...new Set([...dt, ...ct]
      .map((v) => v.key))].sort((a, b) => a.localeCompare(b))
    const { docs } = await db.find({...request, selector: {...selector, date } })
    const values = docs.reduce((cur, value) => {
      const values = value.values.map(v => ({...value, ...v}))
      return [...cur, ...values]
    }, [])
    const result = accounts.map((account) => {
      const includes = (...keys) => (value) => keys
        .map(key => accounts
          .find((v) => v === `${value[key]}/${value.lombard}` ) || value[key])
            .includes(account)
      const items = values.filter(includes('dt', 'ct'))
      return { 
        key: account, 
        values: items,
        summ: {
          dt: summ(...items.filter(includes('dt')).map(v => v.summ)),
          ct: summ(...items.filter(includes('ct')).map(v => v.summ)),
        },
        dt: (dt.find(includes('key')) || {}).summ,
        ct: (ct.find(includes('key')) || {}).summ
      }
    })
    res.json(result)
  } catch(e) {
    console.error(e);
    res.status(e.status).json(e)
  }
})

router.post('/', async ({ db, body}, res) => {
  const id = body._id
  const value = id && await db.get(id)
  db[id ? 'put' : 'post']({...value, ...body, type })
    .then(v => res.json(v))
      .catch(e => res.status(e.status).json(e))
})

router.post('/remove', async ({ db, body }, res) => {
  db.get(body._id)
    .then((v) => db.remove(v))
      .then((v) => res.json(v))
        .catch(e => res.status(e.status).json(e))
})

module.exports = router


