const { COUCHDB_URI, SITE_URL } = process.env
const PouchDB = require("pouchdb")
const db = new PouchDB(COUCHDB_URI +'/lombards')
const express = require('express')
const router = express.Router()
const { sign } = require('../functions')


const profile = ({ _id, name, active }) => ({
  _id, name, active, token: sign({ _id, url: SITE_URL + '/api' })
})

const post = async (body) => {
  const lombard = body._id ? await db.get(body._id) : {}
  return db.post({ ...lombard, ...body })
}

const get = async (id) => {
  const docs = await db.allDocs({ include_docs: true })
  .then(({ rows }) => rows.map(v => v.doc))
  return id ? docs.find(v => v._id === id) : docs
}

router.get('/', async ({}, res) => {
  get().then(v => res.json(v.map(profile)))
  
})

router.post('/', async ({ body }, res) => {
  post(body)
    .then(v => res.json(v))
  // res.json(info)
})

router.post('/remove', async ({ body }, res) => {
  const info = await db.get(body._id)
    .then(v => db.put({...v, _deleted: true }))
  res.json(info)
})

module.exports =  {
  router,
  post,
  get
}


