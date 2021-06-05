const mongoose = require('mongoose')
const Schema = mongoose.Schema;
const { mixins, getConnection } = require('./functions')

const schema = new Schema({
  lombard_id: { type: Schema.Types.ObjectId, required: true, ref: 'lombard' },
  user_id: { type: Schema.Types.ObjectId, required: true, ref: 'user' },
  parent_id: { type: Schema.Types.ObjectId, ref: 'transaction' },
  date: { type: Date, default: new Date() },
  name: { type: String }
})

schema.pre('save', function() {})

module.exports = Transaction =  Object.assign( getConnection('transaction', schema), mixins, {

})