const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const { mixins, getConnection, compare, sign } = require('./functions')

const profile = { type: String,
  get () {
    return {
      id: this.id,
      name: this.name,
      email: this.email,
      active: this.active,
    }
  }
}

const token = { type: String,
  get () {
    return sign({ id: this.id }, '1d')
  }
}

const schema = new Schema({
  profile, token, 
  sign: { type: String,
    get () {
      return sign({ id: this.id }, '1d')
    }
  },
  company_id:  mongoose.Schema.Types.ObjectId,
  name: {
    type: String,
    required: true
  },
  email: {
    type: String,
    required: true,
    unique: true
  },
  password: {
    type: String,
    required: true
  },
  date: {
    type: Date,
    default: Date.now
  },
  active: {
    type: Boolean,
    default: false
  }
})

schema.methods.verifyPassword = async function(password){
  return User.compare(password, this.password)
}

schema.pre('save', function() {
  this.password = hash(this.password)  
})

schema.methods.verify = function (password) {
  if (!password) throw { password: 'no password'}
  if (!compare(password, this.password)) throw { password: 'bad password'}
  return this
}

module.exports = User =  Object.assign( getConnection('user', schema), mixins, {
  async get() {
    return [{name: "fdsf"}]
  }
})



