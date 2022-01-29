const functions = require('../../../functions')
const  getAddress = (address) => [
  { key: 'city', value: 'город'},
  { key: 'region', value: 'область'},
  { key: 'district', value: 'район'},
  { key: 'street', value: 'улица'},
  { key: 'home', value: 'дом'},
  { key: 'flat', value: 'квартира'},
].filter(({key}) => address[key])
  .map(({key, value}) => `${value} ${address[key]}`).join(', ')

module.exports = {
  ...functions,
  getAddress
}