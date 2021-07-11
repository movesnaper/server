const {summ} = require('../functions')

module.exports = async ({ values }, res) => {
  try {
    const issued = values.filter((v) => v.dt === '377')
    const gold = issued.filter((v) => v.zalog === 'gold')
    const things = issued.filter((v) => v.zalog === 'things')
    res.json({ 
      gold: {
        summ: Math.round(gold.reduce(summ, 0) / 1000),
        count: gold.length
      },
      things: {
        summ: Math.round(things.reduce(summ, 0) / 1000),
        count: things.length
      }
    })
  } catch({ message }) {
    res.status(404).json(message)
  }
}
