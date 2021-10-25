module.exports = async (req, res) => {
  const accounts = await require('./accounts')(req, res)
  return accounts.map((account) => {
    return { is: 'account', account, startDt: '0.00', dt: '0.00', endDt: '0.00' }
  })
}