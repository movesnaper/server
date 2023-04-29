import * as Nano  from 'nano'
const {db} = Nano(process.env.COUCHDB)
console.log(db);
// const { COUCHDB, PASSWORD } = process.env
// const auth = { username: 'admin', password: PASSWORD }
// const PouchDB = require("pouchdb")
// PouchDB.plugin(require('pouchdb-authentication'))
// PouchDB.plugin(require('pouchdb-quick-search'))
// module.exports = { PouchDB, auth, url: COUCHDB }
module.exports = { nano: db }