const { auth, newPouchDb } = require('../../functions')
const bcrypt = require('bcrypt')

 const post = async (req, res) => {
  const { company = 'klients', user } = req.body
  const db = newPouchDb(company)
  try {
    const [{ password } = {} ] = (await db.find({ selector: { name: user.name }, fields: ['password']})).docs
    if (!password) throw { name: 'user_not_found'}
    const match = await bcrypt.compare(user.password, password)
    if (!match) throw { password: 'incorect_password'}
    return db.logIn(company, auth.password)
  } catch(err) {
    res.status(404).json(err)
  }
}

module.exports = { post }