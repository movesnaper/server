const mongoose = require('mongoose')
const Schema = mongoose.Schema;
const { mixins, getConnection, moment } = require('./functions')

const schema = new Schema({
date: { type: Date, required: true },
lombard_id: { type: Schema.Types.ObjectId, required: true, ref: 'lombard' },
user_id: { type: Schema.Types.ObjectId, required: true, ref: 'user' },
// klient: { type: Schema.Types.ObjectId, ref: 'klient' },
// passport: { type: Number },
// bilet: {},
// obespechenie: [],
values: []
})

schema.post('init', function (doc) {
    const { _id, date, values } = doc
    doc.values = values.map(v => {
        return { ...v, _id, date: moment(date).format('L') }
    })
})

// schema.post('remove',  function (doc, next) {
//     const { ref_id } = doc
//     if (ref_id)  ref_id.remove()
//     next()
// })

// schema.pre('find',  function () {
//     this.populate('ref_id')
// })



module.exports = Reestr =  Object.assign( getConnection('reestr', schema), mixins, {
    async getAll(lombard_id) {
        const res = await this.find({ lombard_id })
        return res.reduce((cur, { values }) => [ ...cur, ...values ], [])
    }
})