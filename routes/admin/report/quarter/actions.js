module.exports = (req, res) => {
  const { periods } = req.period
  try {
    return [
      require('../actions')(periods)
    ]
  } catch(e) {
    console.error(e);
    res.status(500).json({ 'uorter-actions': e.message })
  }
}