const express = require('express')
const router = express.Router()
const { nano } = require('../../functions')
const db = nano.use('schema')

router.get('/:id?', async (req, res) => {
    try {
        res.status(200).json(await db.get(req.params.id))
      } catch(e) {
        console.error(e);
        res.status(500).json(e)
      }
})


module.exports = router