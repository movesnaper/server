const { COUCHDB, PASSWORD } = process.env
const auth = { username: 'admin', password: PASSWORD }
const PouchDB = require("pouchdb")
PouchDB.plugin(require('pouchdb-authentication'))
module.exports = { PouchDB, auth, url: COUCHDB }