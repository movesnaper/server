
const reestr = (lombard, deleted = false) => ({ type: 'reestr', lombard, deleted: { $exists: deleted }})

const klient = (deleted = false) => ({ type: 'klient', deleted: { $exists: deleted }})

const user = (deleted = false) => ({ type: 'user', deleted: { $exists: deleted }})

const lombard = (deleted = false) => ({ type: 'lombard', deleted: { $exists: deleted }})

const values = ({lombard, start, end}) => ({ ...reestr(lombard), date: { $gte: start, $lt: end }})

const used = (end, ref = true) => ({ ...reestr, 
  ref: { $exists: ref }, 
  date: { $lt: end },
  // number: { $exists: true }
})

module.exports = {
  limit: 10000,
  reestr,
  klient,
  user,
  lombard,
  values,
  used,
}