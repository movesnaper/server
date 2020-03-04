
const jwt = require('jsonwebtoken')
const { COUCHDB, PASSWORD, SECRET_OR_KEY } = process.env
const auth = { username: 'admin', password: PASSWORD }
const PouchDB = require("pouchdb")
PouchDB.plugin(require('pouchdb-authentication'))
const  verify = async (token) =>  {
    const value = jwt.verify(token, SECRET_OR_KEY)
    if (!value) throw 'bad_token'
    return value
}


const sign = (v, expiresIn) => jwt.sign(v, SECRET_OR_KEY)

const newPouchDb = url =>
    new PouchDB(url ? `${COUCHDB}/${url}` : COUCHDB, { auth })
const docs = ({ rows }) => rows.map(v => v.doc)
// const get = async (url, id) => {
//     const db = newPouchDb(url)
//     const docs = await db.allDocs({ include_docs: true })
//     .then(({ rows }) => rows.map(v => v.doc))
//     return id ? docs.find(v => v._id === id) : docs
//   }
  
//   const put = async (url, body) => {
//     const db = newPouchDb(url)
//     const doc = await db.get(body._id).catch(() => {})
//     return db.put({...doc, ...body })
//   }

module.exports = { newPouchDb, docs, verify, sign }