const { toNumber, toDouble, summ } = require('../functions')
const { between } = require('../filters')
const strong = 'font-weight: 600;'
const modal = {is: 'reestr-value', attrs: { width: '70%' }}

const get = async (req, res) => {
  const { settings } = req.company
  const { start = settings.date, end } = req.query
  try {
    const { rows: accounts } = await req.db.query(`account/values`)
    const { rows } =  await req.db.query(`my_index/values`)
    const reduce = (target, account, filter, initial = 0) => rows
      .filter(({ value }) => value[target] === account)
        .filter(({ key }) => filter(key))
          .reduce((cur, {value}) => summ(cur, value), toNumber(initial))
    const values = accounts.map(({ key, value }) => {
      const startDt = reduce('dt', key, between(settings.date, start), value.summ_dt)
      const startCt = reduce('ct', key, between(settings.date, start), value.summ_ct)
      const dt = reduce('dt', key, between(start, end))
      const ct = reduce('ct', key, between(start, end))
      return { 
        account: { is: 'account-value', value: key },
        startDt: { ...modal, value: toDouble(value.active && startDt - startCt) },
        startCt: { ...modal, value: toDouble(value.passive && startCt - startDt) },
        dt: { ...modal, value: toDouble(dt) },
        ct: { ...modal, value: toDouble(ct) },
        endDt: { ...modal, value: toDouble(value.active && startDt + dt - ct) },
        endCt: { ...modal, value: toDouble(value.passive && startCt + ct - dt) }
      }
    })
    const total = (key) => values.reduce((cur, value) => cur += toNumber(value[key].value), 0)
    res.status(200).json({
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
    })
  } catch (e) {
    res.status(500).json({ values: e.message })
    console.error(e);
  }
}

module.exports = { get }