module.exports = ({ title, lombard, company, period }, res) => {
  const { name, kod } = lombard || company
  try {
    return require('../headers')({ title, name, kod, period: period.value })
  } catch(e) {
    res.status(500).json({ 'header': e.message })
    console.error(e);
  }
}