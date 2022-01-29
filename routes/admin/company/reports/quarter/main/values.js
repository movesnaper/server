const { summ } = require('../../functions')
const { values, limit } = require('../../selectors')
const docs = (cur, value) => [...cur, ...value.values.map((v) => ({...value, ...v}))]
const result = (docs = [], acc, result = (v) => v) => {
  const dt = docs.filter(({ dt }) => [dt].includes(acc)).reduce(summ, 0)
  const ct = docs.filter(({ ct }) => [ct].includes(acc)).reduce(summ, 0)
  return result({ dt, ct })
}

module.exports = async (req, res) => {
  const { start, end } = require('../period')(req, res)
  const fields = ['_id', 'date', 'values', 'zalog']
  try {
    const settings = (key, acc) => req.company.settings[key]
    .filter((v) => v.key.split('/')[0] === acc)
      .reduce(summ, 0)

  const startDocs = (await req.db.find({
    selector: values({ start: req.company.date, end: start }),
    fields,
    limit
  })).docs.filter((v) => v.values.length).reduce(docs, [])

  const docsValues = (await req.db.find({
    selector: values({ start, end }),
    fields,
    limit
  })).docs.filter((v) => v.values.length).reduce(docs, [])

  return {
    values: docsValues,
    dt: (acc, format = (v) => v ) => {
      const start = result(startDocs, acc, ({dt, ct}) => settings('dt', acc) + dt - ct)
      const { dt, ct } = result(docsValues, acc)
      const end = start + dt - ct
      return { 
        start: format(start), 
        dt: format(dt), 
        ct: format(ct), 
        end: format(end > 0 ? end : 0) 
      }
    },
    ct: (acc, format = (v) => v) => {
      const start = result(startDocs, acc, ({dt, ct}) => settings('ct', acc) + ct - dt)
      const { dt, ct } = result(docsValues, acc)
      const end = start + ct - dt
      return { 
        start: format(start), 
        dt: format(dt), 
        ct: format(ct), 
        end: format(end > 0 ? end : 0) 
      }
    }
  }
  } catch(e) {
    res.status(500).json({ values: e.message })
    console.error(e);
  }
}