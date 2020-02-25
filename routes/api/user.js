const express = require('express')
const router = express.Router()


router.get('/', (req, res) => {
  User.get()
    .then((users) => res.json(users.map(({profile}) => profile)))
      .catch(err => res.status(400).json(err))
})
router.post('/', ({ body }, res) => {
  User.save(body)
    .then(() => res.json('ok'))
      .catch(err => res.status(400).json(err))
})
router.post('/remove',({ body} , res) => {
  User.remove(body.id)
    .then(() => res.json('ok'))
      .catch(err => res.status(400).json(err))
})

module.exports = router


