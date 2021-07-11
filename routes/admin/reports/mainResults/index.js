const {moment, format, toNumber, toDouble, monthRange} = require('../../../../functions')

const selector = {
  deleted: { $exists: false },
  type: 'reestr'
}
const request = {
  selector,
  limit: 10000
}

const results = async ({ db, query }, res) => {
  const { start, end } = query
  selector.date = { $gt: start, $lt: end }
  try {
    const { docs } = await db.find({ ...request, fields: ['values']})

    const values = docs.reduce((cur, { values }) => [...cur, ...values], [])

    const credits = values.filter((v) => v.dt === '377')
      .reduce((cur, v) => cur + toNumber(v.summ), 0)

    const procents = values.filter((v) => v.dt === '703')
      .reduce((cur, v) => cur + toNumber(v.summ), 0)

    const payed = {
      credits: Math.round(values.filter((v) => v.ct === '377' && v.dt === '301')
        .reduce((cur, v) => cur + toNumber(v.summ), 0) / 1000),
      procents: Math.round(values.filter((v) => v.ct === '703' && v.dt === '301')
        .reduce((cur, v) => cur + toNumber(v.summ), 0) / 1000)
    }

    const dogovor = 'await dogovor(req)'
    res.json({
      credits: Math.round(credits / 1000),
      procents: Math.round(procents / 1000),
      payed,
      dogovor
    })
  } catch(e) {
    res.status(404).json(e)
    console.error(e);
  }
}

module.exports = results