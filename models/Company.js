const mongoose = require('mongoose')
const Schema = mongoose.Schema
const { mixins, getConnection, compare, sign, hash  } = require('./functions')

const profile = { type: Object,
  get () {
    return {
      id: this.id,
      name: this.name,
      email: this.email,
      conn: this.conn,
      active: this.active,
    }
  }
}

const schema = new Schema({
  profile,
  sign: { type: String,
    get () {
      return sign({ id: this.id }, '1d')
    }
  },
  name: {type: String},
  email: {type: String},
  password: {type: String},
  conn: {type: String},
  active: {type: Boolean, default: false},
  date: {
    type: Date,
    default: Date.now
  }
})

schema.pre('save', function() {
  this.password = hash(this.password)
})

schema.methods.verify = function (password) {
  if (!password) throw { password: 'no password'}
  if (!compare(password, this.password)) throw { password: 'bad password'}
  return this
}

module.exports = Company =  Object.assign( getConnection('company', schema), mixins, {

})

