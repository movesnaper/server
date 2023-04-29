const nano = require('nano')(process.env.COUCHDB)
const jwt = require('jsonwebtoken')
const { SECRET_OR_KEY } = process.env


const  verify = async (token) =>  {
  const value = jwt.verify(token, SECRET_OR_KEY)
  if (!value) throw 'bad_token'
  return value
}

const sign = v => jwt.sign(v, SECRET_OR_KEY)

const docs = (v) => v.doc

const reduce = ({ docs }) => docs.reduce((cur, v) => ({...cur, [v._id]: v }), {})

const shortName = ({ family = '', name = '', sername = '' }) => 
  [family, name.charAt(0), sername.charAt(0)].join(' ')

const keyValue = ((cur, { key, doc}) => {
  return {...cur, [key]: doc}
})

module.exports = { nano, docs, keyValue, verify, sign, reduce, shortName }