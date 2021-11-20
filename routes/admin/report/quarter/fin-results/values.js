const { toDouble, toNumber } = require('../../functions')
const ru = {
  'ssuda-issued': 'Сумма предоставленных финансовых кредитов, в том числе:',
  'gold': 'изделий из драгоценных металлов и драгоценных камней',
  'things': 'бытовой техники',
  'ocenca-issued': 'Оценочная стоимость имущества и/или имущественных прав, принятых в залог',
  'ssuda-payed': 'Сумма возвращённых финансовых кредитов, в том числе:',
  'payed-by-money': 'оплачено денежными средствами',
  'payed-by-sell': 'за счёт реализации имущества, предоставленного в залог',
  'accrued-procent': 'Сумма начисленных процентов',
  'payed-procent': 'Сумма полученных процентов за пользование финансовыми кредитами, в том числе:',
  'penalty-payed': 'Сумма полученной неустойки, в том числе',
  'income': '2 Общая сумма полученного дохода, в том числе',
  'income-procent': 'полученных процентов за пользование финансовыми кредитами',
  'income-penalty': 'полученной неустойки',
  'count-issued': 'Количество договоров предоставленных финансовых кредитов, в том числе:',
  'count-payed-by-sell': 'Количество договоров за счёт реализации имущества, предоставленного в залог',
  'rate-issued': 'Средневзвешенная годовая процентная ставка по финансовым кредитам'

}

const filter = {
  issued: ({ dt }) => dt ==='377',
  gold: ({ zalog }) => zalog === 'gold',
  things: ({ zalog }) => zalog !== 'gold',
  payed: ({ ct }) => ct === '377',
  procent: ({ dt, ct }) => [dt, ct].includes('703'),
  penalty: ({ ct }) => ct ==='704',
  byMoney: ({ dt }) => dt ==='301',
  bySell: ({ dt }) => dt !=='301'
}

const bold = 'font-weight: 600;'
const summ = (key) => (cur, v) => {
  return cur += toNumber(v[key])
}
const count = (cur) => cur += 1

const get = async (req, res) => {
  const issued = await require('./issued')(req, res)
  const getSumm = (key, ...filters) => {
    const getFilter = (v) => filters.every((key) => filter[key](v))
    const getSumm = (values = []) => {
      const value = key && values
        .filter(getFilter)
          .reduce(summ(key), 0)
      return value ? toDouble(value) : '-'
    }
    return { 
      start: getSumm(issued.start), 
      end: getSumm(issued.end) 
    }
  }
  const getCount = (...filters) => {
    const getFilter = (v) => filters.every((key) => filter[key](v))
    const getCount = (values = []) => values.filter(getFilter).reduce(count, 0)
    return { 
      start: getCount(issued.start), 
      end: getCount(issued.end) 
    }
  }

  try {
    const procentSumm = getSumm('issued', 'procent')
    const values = [
      { title: '1 Данные о кредитной деятельности', style: bold },
      { kod: `10`, title: ru['ssuda-issued'], ...getSumm('ssuda', 'issued') },
      { kod: `11`, title: ru['gold'], ...getSumm('ssuda', 'issued', 'gold') },
      { kod: `12`, title: ru['things'], ...getSumm('ssuda', 'issued', 'things') },
      { kod: `20`, title: ru['ocenca-issued'], ...getSumm('ocenca', 'issued') },
      { kod: `30`, title: ru['ssuda-payed'], ...getSumm('ssuda', 'payed') },
      { kod: `31`, title: ru['payed-by-money'], ...getSumm('ssuda', 'payed', 'byMoney') },
      { kod: `32`, title: ru['payed-by-sell'], ...getSumm('ssuda', 'payed', 'bySell') },
      { kod: `40`, title: ru['accrued-procent'], ...procentSumm },
      { kod: `50`, title: ru['payed-procent'], ...procentSumm },
      { kod: `51`, title: ru['payed-by-money'], ...procentSumm },
      { kod: `52`, title: ru['payed-by-sell'], ...getSumm() },
      { kod: `60`, title: ru['penalty-payed'], ...getSumm('penalty') },
      { kod: `61`, title: ru['payed-by-money'], ...getSumm('penalty') },
      { kod: `62`, title: ru['payed-by-sell'], ...getSumm() },
      { kod: `80`, title: ru['income'], ...getSumm('income'), style: bold },
      { kod: `81`, title: ru['income-procent'], ...getSumm('income', 'procent') },
      { kod: `82`, title: ru['income-penalty'], ...getSumm('income', 'penalty') },
      { title: '3 Информация о кредитах', style: bold },
      { kod: `100`, title: ru['count-issued'], ...getCount('issued') },
      { kod: `101`, title: ru['gold'], ...getCount('issued', 'gold') },
      { kod: `102`, title: ru['things'], ...getCount('issued', 'things') },
      { kod: `107`, title: ru['count-payed-by-sell'], ...getCount('payed', 'bySell') },
      // { kod: `110`, title: ru['rate-issued'], style: bold, ...getRate() },
    ]
    res.status(200).json({ values })
  } catch(e) {
    res.status(500).json(e)
    console.error(e);
  }
}

module.exports = { get }