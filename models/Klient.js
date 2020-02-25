const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const { getConnection, mixins } = require('./functions')

const schema = new Schema({
  lombard_id:  mongoose.Schema.Types.ObjectId,
  user_id:  mongoose.Schema.Types.ObjectId,
  name: { type: String, required: true },
  sername: { type: String, required: true },
  family: { type: String, required: true },
  idn: { type: String, default: Date.now },
  address: {},
  passport: [
    {
      seria: {type: String},
      number: {type: String},
      issued: {type: String},
    }
  ],

  
})

module.exports = Klient =  Object.assign( getConnection('klient', schema), mixins, {
  async getAll(lombard_id) {
    const res = await this.find({ lombard_id })    
    const values = (cur, v) => Object.assign(cur, { [v._id]: v })
    return res.reduce(values, {})
  },
})

