
const express = require('express')
const router = express.Router()


router.get('/', ({ user_id }, res) => {
    User.findById(user_id)
        .then(({ profile }) => res.json(profile))
            .catch(err => res.status(400).json(err))
})

router.post('/', ({ body, user_id }, res) => {
    User.save({ ...body, user_id })
        .then(() => res.json('ok'))
            .catch(err => res.status(400).json(err))   
})

module.exports = router