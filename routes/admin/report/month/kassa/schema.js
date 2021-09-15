const headers = require('./headers')

module.exports = ({ lombard }) => {
  return { 
    key: 'kassa', 
    text: 'Касса ломбардов',
    lombard,
    headers
  }
}
