const express = require('express')
const router = express.Router()

router.get('/', ({ lombard_id }, res) => {
    Bilet.getAll(lombard_id)
        .then(v => res.json(v))
            // .catch(err => res.status(400).json(err))
})

router.post('/', ({ body, lombard_id, user_id }, res) => {
    Bilet.save(body, lombard_id, user_id)
        .then(v => res.json(v._id))
            // .catch(err => res.status(400).json(err))
})

module.exports = router