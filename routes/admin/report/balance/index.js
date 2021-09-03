
module.exports = async (req, res) => {
  try {
    const dt = await require('./dt')(req)
    const ct = await require('./ct')(req)
    const fund = await require('./fund')(req)
    res.json({ 
      dt,
      ct,
      fund
    })
  } catch({ message }) {
    res.status(404).json(message)
  }
}
