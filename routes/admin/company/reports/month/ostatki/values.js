const { toDouble, toNumber, moment } = require('../../functions')
const strong = 'font-weight: 600;'

const get = async (req, res) => {
  const issued = await require('./issued')(req, res)
  const klients = await require('./klients')(req, res)
  const total = (key) => issued.reduce((cur, v) => cur += toNumber(v[key]), 0)
  try {
    const obespechenie = (cur, v) => {
      const obespechenie = (v.obespechenie || []).map((obespechenie, i) => {
          const klient = klients.find((klient) => klient._id === v.klient) || {}
          return i ? obespechenie : { ...v, ...obespechenie,
            klient: `${klient.family} ${klient.name.charAt(0)}. ${klient.sername.charAt(0)}.`,
            ssuda: toDouble(v.ocenca),
            ocenca: toDouble(obespechenie.ocenca), 
            date: v.date ? moment(v.date).format('DD.MM.YYYY') : ''
          }
        })
      return [...cur, ...obespechenie ]
    }
    return {
      values: issued.reduce(obespechenie, []),
      footer: { 
        number: { style: strong, value: 'Итого'},
        ssuda: { style: strong, value: toDouble(total('ocenca')) }
      }
    }
  } catch(e) {
    res.status(500).json({ values: e.message })
    console.log(e);
  }
}

module.exports = { get }