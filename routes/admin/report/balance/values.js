const { toNumber, toDouble, summ } = require('../functions')
const { between } = require('../filters')

module.exports = async (req, res) => {

  const { settings } = req.company
  const { start, end } = req.query
  try {
  const accounts = await require('./accounts')(req, res)
  const { rows } =  await req.db.query(`my_index/values`)
  const reduce = (target, account, filter, { summ: init } = {}) => rows
    .filter(({ value }) => value[target] === account)
      .filter(({ key }) => filter(key))
        .reduce((cur, {value}) => summ(cur, value), toNumber(init))
  const getInitial = (key, acc) => settings[key].find((v) => v.key === acc)
  return accounts.map((acc) => {
    return { 
      account: { is: 'account-value', value: acc },
      startDt: {
        is: 'reestr-value',
        value: toDouble(reduce('dt', acc, between(settings.date, start), getInitial('dt', acc)))
      },
      startCt: {
        is: 'reestr-value',
        value: toDouble(reduce('ct', acc, between(settings.date, start), getInitial('ct', acc)))
      },
      dt: {
        is: 'reestr-value',
        value: toDouble(reduce('dt', acc, between(start, end)))
      },
      ct: {
        is: 'reestr-value',
        value: toDouble(reduce('ct', acc, between(start, end)))
      },
      endDt: {
        is: 'reestr-value',
        value: toDouble(reduce('dt', acc, between(settings.date, end), getInitial('dt', acc)))
      },
      endCt: {
        is: 'reestr-value',
        value: toDouble(reduce('ct', acc, between(settings.date, end), getInitial('ct', acc)))
      }
    }
  })
} catch (e) {
  console.error(e);
}

}