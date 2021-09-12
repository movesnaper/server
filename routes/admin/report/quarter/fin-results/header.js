const center = 'text-align: center;'

module.exports = async (req, res, next) => {
  try {
    const header = [
      { key: 'title', text: 'Наименование показателя' },
      { key: 'kod', text: 'Код строки', style: center},
      { key: 'start', text: 'За отчётный квартал', style: center },
      { key: 'end', text: 'С начала года', style: center }
    ]    
    req.header = header
    next()
  } catch(e) {
    res.status(500).json({ title: e.message })
    console.error(e);
  }
}