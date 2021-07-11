module.exports = async (req, res) => {
  try {
    const kassa = await require('./kassa')(req)
    const bank = await require('./bank')(req)
    res.json({ 
      kassa,
      bank
    })
  } catch({ message }) {
    res.status(404).json(message)
  }
}
