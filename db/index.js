const { COUCHDB, POSSWORD } = process.env
const auth = { username: 'admin', password: POSSWORD }
const PouchDB = require("pouchdb")
PouchDB.plugin(require('pouchdb-authentication'))
module.exports = { PouchDB, auth, url: COUCHDB }