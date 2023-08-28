const express = require('express')
const router = express.Router()
const { nano, sign, bcrypt } = require('../../functions')
const db = nano.use('users')
const populate = (data) => {
  return {
    name: data._id
  }
}
const getHash = async ({password, confirm}) => {
    return password === confirm && bcrypt.hash(password, 10)
}

router.post('/login/:id', async ({params, body}, res) => {
  try {
    const data = await db.get(params.id)
    const password = await getHash(body)
    db.insert({password, ...data}, data._id)
    const match = await bcrypt.compare(body.password, data.password || password)
    if (!match) throw { password: 'incorect_password'}
    res.set('jwt', await sign(data, populate))
    res.status(200).json({})
  } catch(e) {
    res.status(500).json(e)
  }
})


module.exports = router