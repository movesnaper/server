const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const { getConnection, mixins } = require('./functions')
const  profile = { type: Object,
  get () {
    return {
      id: this.id,
      name: this.name,
      active: this.active
    }
  }
}
const accounts = {
  ct: { '377': 'vozvrashena ssuda', '703': 'uplachen procent', '704': 'uplachena pena', '400': 'ustavniy fond' },
  dt: { '377': 'vidana ssuda', '777': 'zarplata' }
}
const settings = {
  accounts,
  discounts: [ 10, 15, 20 ],
  ok: 2500.25,
  minRows: 5,
  price: { '375': '10.2', '583': '20.5', '585': 25 },
  numberFormat: [2, ',', ' '],
  discounts: ['10', '15', '20'],
  maxDays: '31',
  minDays: '1',
  procent: '0.7',
  penalty: '1'
}

const schema = new Schema({ profile,
  company_id:  mongoose.Schema.Types.ObjectId,
  name: { type: String, required: true },
  okpo: { type: String, default: '018120' },
  bookkeeper: mongoose.Schema.Types.ObjectId,
  date: { type: Date, default: Date.now },
  active: { type: Boolean, default: false },
})

schema.pre('save', async function() {})

module.exports = Lombard =  Object.assign( getConnection('lombard', schema), mixins, {
  async getProfile(id) {
    const { profile } = await this.findById(id)    
    const bookkeeper = 'Bookkeeper A.B.'
    return { ...profile, settings, bookkeeper }
  }
})


