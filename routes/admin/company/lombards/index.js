const express = require('express')
const router = express.Router()
const { nano } = require('../../functions')
const db = nano.use('lombards')

router.get('/', async (req, res) => {
    try {
        const {value} = await db.get(req.params.id)
        res.status(200).json(value)
      } catch(e) {
        console.error(e);
        res.status(500).json(e)
      }
})
router.get('/:id?', async (req, res) => {
    try {
        const {value} = await db.get(req.params.id)
        res.status(200).json(value)
      } catch(e) {
        console.error(e);
        res.status(500).json(e)
      }
})


module.exports = router