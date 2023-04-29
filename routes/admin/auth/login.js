const { nano } = require('../../functions')
const bcrypt = require('bcrypt')
const db = nano.use('users')

 const post = async ({ body }, res) => {
  try {
    const {password} = await db.get(body.user)
    const match = await bcrypt.compare(password, body.password)
    // if (!match) throw { password: 'incorect_password'}
  } catch(err) {
    res.status(404).json(err)
  }
}

module.exports = { post }