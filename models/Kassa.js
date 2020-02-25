const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const {mixins, getConnection} = require('./functions')


const schema = new Schema({
  name: {
    type: String,
    required: true
  },
  sername: {
    type: String,
    required: true
  },
  family: {
    type: String,
    required: true
  },
  date: {
    type: Date,
    default: Date.now
  },
  active: {
    type: Boolean,
    default: false
  }
});

module.exports =  Kassa = {
  ...mixins,
  get conn() {
    return getConnection('kassa', schema, this.url)    
  }

}
