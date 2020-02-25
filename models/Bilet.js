
const mongoose = require('mongoose')
const Schema = mongoose.Schema;
const { mixins, getConnection, moment } = require('./functions')

const schema = new Schema({
  lombard_id: { type: Schema.Types.ObjectId, ref: 'lombard' },
  user_id: { type: Schema.Types.ObjectId, ref: 'user' },
  value: {},
})

// schema.pre('save', function() {})
schema.methods.getValue = function() {
  const { _id, klient_id, number, spec, obespechenie } = this
  const date = moment(this.date).format('L')
  return { _id, klient_id, date, number, spec, obespechenie }
}

module.exports = Bilet =  Object.assign( getConnection('bilet', schema), mixins, {
  async getAll(lombard_id) {
    const res = await this.find({ lombard_id })
    const values = (cur, { _id, value }) => Object.assign(cur, { [_id]: value })
    return res.reduce(values, {})
  },
  save(value, lombard_id, user_id) {
    value.klient = value.klient._id
    value.passport = value.klient.passport
    return mixins.save.call(this, { value, lombard_id, user_id })
  }
})