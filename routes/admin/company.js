const express = require('express')
const router = express.Router()

router.get('/', async ({ db }, res) => {
  try {
    res.json(await db.get('company'))
  } catch(err) {
    res.status(401).json(err)
  }
})

// router.post('/', async ({ db, body}, res) => {
//   const _id = 'company'
//   db.put({ _id, type: 'company', ...body })
//     .then(v => res.json(v))
//       .catch(err => console.error(err))
// })

module.exports = router


