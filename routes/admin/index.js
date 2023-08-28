const express = require('express')
const router = express.Router()
const { verify, sign } = require('../functions')
router.get('/', require('./users/admins.js'))

const auth = async (req, res, next) => {
  const token = req.get("jwt")
  if (!token) res.status(401).json('auth_user_requred')
  try {
    const { name } = await verify(token)
    res.set('jwt', sign({ name }))
    next()
  } catch(err){
    res.status(401).json({ err })
  }
};

router.use('/auth', require('./auth/index.js'))
router.use('/company', auth, require('./company/index.js'))
router.use('/schema', auth, require('./schema/index.js'))
router.use('/lombards', auth, require('./lombards/index.js'))
router.use('/programs', auth, require('./programs/index.js'))
router.use('/users', auth, require('./users/index.js'))




module.exports = router