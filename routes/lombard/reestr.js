const express = require('express')
const router = express.Router()

router.get('/', ({ lombard_id }, res) => {    
    Reestr.getAll(lombard_id)
        .then((result) => res.json(result))
            // .catch(err => res.status(400).json(err))
})

router.post('/', ({ body, lombard_id, user_id }, res) => {
    Reestr.save({ ...body, lombard_id, user_id })
        .then(v => res.json(v._id))
            // .catch(err => res.status(400).json(err))
})

router.post('/remove', ({ body }, res) => {    
    Reestr.remove(body._id)
        .then(() => res.json('ok'))
            .catch(err => res.status(400).json(err))
})

module.exports = router