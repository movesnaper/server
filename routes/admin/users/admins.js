const express = require('express')
const router = express.Router()
const { nano } = require('../../functions')
const db = nano.use('users')
const roles = ({doc}) => doc._id === 'admin' || (doc.roles || []).includes('admin')
router.get('/', async (req, res) => {
  try {
      const {rows} = await db.list({include_docs: true})
      const admins = rows.filter(roles).reduce((prev, {doc}) => {
        return {...prev, [doc._id]: !!doc.password}
      }, {})
      res.status(200).json(admins)
    } catch(e) {
      console.error(e);
      res.status(500).json(e)
    }
})

module.exports = router