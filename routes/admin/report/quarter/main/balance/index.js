const { values, limit } = require('../../selectors')

module.exports = async (req, res, next) => {
  const kassa = get
  try {
    req.balance = {
      dt: () => {}
    }
    next()
  } catch(e) {
    res.status(500).json({ balance: e.message })
    console.error(e);
  }
}