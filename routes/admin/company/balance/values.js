const { toNumber, toDouble, moment } = require('../../../../functions')
const summ = (cur, v) => cur += toNumber(v.summ)
const between = (start, end) => (date) => moment(date).isBetween(moment(start), moment(end))
const strong = 'font-weight: 600;'
const modal = (params) => ({is: 'reestr-value', attrs: { width: '70%', params }})

const get = async (req, res) => {
  const { settings } = req.company
  const { start = settings.date, end } = req.query
  try {
    const { rows: accounts } = await req.db.query(`account/values`)
    const { rows } =  await req.db.query(`my_index/values`)
    const reduce = (target, account, filter, initial = 0) => 
      rows.filter(({ value }) => value[target] === account)
        .filter(({ key }) => filter(key))
          .reduce((cur, {value}) => summ(cur, value), toNumber(initial))
    const values = accounts.map(({ key, value }) => {
      const startDt = reduce('dt', key, between(settings.date, start), value.summ_dt)
      const startCt = reduce('ct', key, between(settings.date, start), value.summ_ct)
      const dt = reduce('dt', key, between(start, end))
      const ct = reduce('ct', key, between(start, end))
      return { 
        account: { is: 'account-value', value: key },
        startDt: { 
          value: toDouble(value.active && startDt - startCt), 
          ...modal({ key: 'dt', startkey: [key, start], endkey: [key] }) 
        },
        startCt:  { 
          value: toDouble(value.passive && startCt - startDt), 
          ...modal({ key: 'ct', startkey: [key, start], endkey: [key] }) 
        },
        dt: { 
          value: toDouble(dt), 
          ...modal({ key: 'dt', startkey: [key, end], endkey: [key, start] }) 
        },
        ct: { 
          value: toDouble(ct), 
          ...modal({ key: 'ct', startkey: [key, end], endkey: [key, start] }) 
        },
        endDt: { 
          value: toDouble(value.active && startDt + dt - ct), 
          ...modal({ key: 'dt', url: 'values', startkey: [key, end] }) 
        },
        endCt: { 
          value: toDouble(value.passive && startCt + ct - dt), 
          ...modal({ key: 'ct', url: 'values', startkey: [key, end] }) 
        }
      }
    })
    const total = (key) => values.reduce((cur, value) => cur += value[key] && toNumber(value[key].value), 0)
    return {
      values,
      footer: {
        account : { is: 'account-value', class: 'pointer', value: { is: 'b-icon', attrs: {
           icon: 'plus-circle',
           variant: 'success'
          }
        }},
        startDt : { style: strong, value: toDouble(total('startDt')) },
        startCt: { style: strong, value: toDouble(total('startCt')) },
        dt: { style: strong, value: toDouble(total('dt')) },
        ct: { style: strong, value: toDouble(total('ct')) },
        endDt: { style: strong, value: toDouble(total('endDt')) },
        endCt: { style: strong, value: toDouble(total('endCt')) }
      }
    }
  } catch (e) {
    res.status(500).json({ values: e.message })
    console.error(e);
  }
}

module.exports = { get }