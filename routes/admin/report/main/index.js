module.exports = async (req, res) => {
  try {
    const credits = await require('./credits')(req)
    const procents = await require('./procents')(req)
    const payed = await require('./payed')(req)
    const dogovor = await require('./dogovor')(req)
    res.json({ 
      credits,
      procents,
      payed,
      dogovor
    })
  } catch({ message }) {
    res.status(404).json(message)
  }
}
