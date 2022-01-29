const users = ({ type }) => type === 'user'
const klients = ({ type }) => type === 'klient'
const lombards = ({ type }) => type === 'lombard'
const reestr = ({ type }) => type === 'reestr'
const dt377 = ({ values = [] }) => values.filter(({ dt }) => dt === '377').length
const ct377 = ({ values = [] }) => values.filter(({ ct }) => ct === '377').length

export default {
  users,
  klients,
  lombards,
  reestr,
  dt377,
  ct377
}
