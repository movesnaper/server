
const jwt = require('jsonwebtoken')
const { COUCHDB, PASSWORD, SECRET_OR_KEY } = process.env
const auth = { username: 'admin', password: PASSWORD }
const PouchDB = require("pouchdb")
PouchDB.plugin(require('pouchdb-authentication'))
PouchDB.plugin(require('pouchdb-find'));
const  verify = async (token) =>  {
  const value = jwt.verify(token, SECRET_OR_KEY)
  if (!value) throw 'bad_token'
  return value
}

const sign = v => jwt.sign(v, SECRET_OR_KEY)

const newPouchDb = (url) => {
  return new PouchDB(url ? `${COUCHDB}/${url}` : COUCHDB, { auth })
}


const docs = ({ rows }) => rows.map(v => v.doc)

module.exports = { newPouchDb, docs, verify, sign, COUCHDB, auth }