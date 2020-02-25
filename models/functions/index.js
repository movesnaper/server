const moment = require('moment')
moment.locale('ru')
const jwt = require('jsonwebtoken')
const bcrypt = require('bcryptjs')
const { SECRET_OR_KEY }= process.env
const getConnection = require('./getConnection')
const mixins = require('./mixins')

module.exports = {
    getConnection,
    mixins,
    moment,
    sign (v, expiresIn){
        return jwt.sign(v, SECRET_OR_KEY, { expiresIn })
    },
    compare (plainPassword, hashPassword){
      return bcrypt.compare(plainPassword, hashPassword)
    },
    hash (password) {
      return bcrypt.hash(password, 10)
    }

}