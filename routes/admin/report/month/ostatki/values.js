const { toNumber } = require('../../functions')

const byNumber = ({ number: a = 0 }, { number: b = 0 } ) => Number(a) - Number(b)

module.exports = async (req, res, next) => {
  try {
    const obespechenie = (cur, v, index ) => {
      const obespechenie = (v.obespechenie || []).map((obespechenie, i) => {
          const { family = '', name = '', sername = '' } = req.klients.find(({ _id }) => _id === v.klient) || {}
          const klient = `${family} ${name.charAt(0)}. ${sername.charAt(0)}.`
          const value = { date: v.date || '', number: v.number, ssuda: toNumber(v.ocenca), klient }
          const ocenca = toNumber(obespechenie.ocenca)
          return !i ? { ...obespechenie, ocenca, ...value, index: index + 1 } : obespechenie
        })
      return [...cur, ...obespechenie ]
    } 
    req.values = req.issued.sort(byNumber).reduce(obespechenie, [])
    next()
  } catch(e) {
    res.status(500).json({ values: e.message })
    console.log(e);
  }
}