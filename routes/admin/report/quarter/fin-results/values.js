const { toNumber } = require('../../functions')
const ru = {
  'ssuda': 'Сумма предоставленных финансовых кредитов, в том числе:',
  'golg': 'изделий из драгоценных металлов и драгоценных камней',
  'things': 'бытовой техники',
  'ocenca': 'Оценочная стоимость имущества и/или имущественных прав, принятых в залог',
  'payed': 'Сумма возвращённых финансовых кредитов, в том числе:',
  'payed-by-money': 'оплачено денежными средствами',
  'payed-by-sell': 'за счёт реализации имущества, предоставленного в залог',
  'accrued-procent': 'Сумма начисленных процентов',
  'payed-procent': 'Сумма полученных процентов за пользование финансовыми кредитами, в том числе:',
  'penalty': 'Сумма полученной неустойки, в том числе',
  'income': 'Общая сумма полученного дохода, в том числе',
  'income-procent': 'полученных процентов за пользование финансовыми кредитами',
  'income-penalty': 'полученной неустойки',
  'count-credits': 'Количество договоров предоставленных финансовых кредитов, в том числе:',
  'cell-credits': 'Количество договоров за счёт реализации имущества, предоставленного в залог',
  'procent-rate': 'Средневзвешенная годовая процентная ставка по финансовым кредитам'

}

const filter = {
  gold: (v) => v.zalog === 'gold',
  before: (v) => filter['gold'](v) && v.diff <= 30,
  after: (v) => filter['gold'](v) && v.diff > 30
}

const summ = (key) => (cur, v) => cur + toNumber(v[key])

const toThousand = (v) => Math.floor(v / 1000)

const bold = 'font-weight: 700;'

const center = 'text-align: center;'

const padding = 'padding-left: 50px;'

module.exports = async (req, res, next) => {
  try {
    const gitItems = (key, filter = () => true) => {
      // const start = req.issued.start.filter(filter).reduce(summ(key), 0)
      // const end = req.issued.end.filter(filter).reduce(summ(key), 0)
      return { start: '', end: '' }
    }

    req.values = [
      { title: '1 Данные о кредитной деятельности', style: bold },
      { kod: `10`, title: ru['ssuda'], style: bold, ...gitItems('ssuda') },
      { kod: `11`, title: ru['golg'], style: padding, ...gitItems('ssuda', 'golg') },
      { kod: `12`, title: ru['things'], style: padding, ...gitItems('key', 'things') },
      { kod: `20`, title: ru['ocenca'], style: bold, ...gitItems('ocenca') },
      { kod: `30`, title: ru['payed'], style: bold, ...gitItems('payed') },
      { kod: `30`, title: ru['payed-by-money'], style: bold, ...gitItems('payed', 'byMoney') },
      { kod: `40`, title: ru['accrued-procent'], style: bold, ...gitItems('accrued-procent') },
      { kod: `50`, title: ru['payed-procent'], style: bold, ...gitItems('payed-procent') },
      { kod: `51`, title: ru['payed-by-money'], style: padding, ...gitItems('payed-procent', 'byMoney') },
      { kod: `52`, title: ru['payed-by-sell'], style: padding, ...gitItems('payed-procent', 'bySell') },
      { kod: `60`, title: ru['penalty'], style: bold, ...gitItems('penalty') },
      { kod: `61`, title: ru['payed-by-money'], style: padding, ...gitItems('penalty', 'byMoney') },
      { kod: `62`, title: ru['payed-by-sell'], style: padding, ...gitItems('penalty', 'bySell') },
      { kod: `80`, title: ru['income'], style: bold, ...gitItems('income') },
      { kod: `81`, title: ru['income-procent'], style: padding, ...gitItems('income', 'procent') },
      { kod: `82`, title: ru['income-penalty'], style: padding, ...gitItems('penalty', 'penalty') },
      { title: '3 Информация о кредитах', style: bold },
      { kod: `100`, title: ru['count-credits'], style: bold, ...gitItems('count-credits') },
      { kod: `101`, title: ru['golg'], style: padding, ...gitItems('count-credits', 'golg') },
      { kod: `102`, title: ru['things'], style: padding, ...gitItems('count-credits', 'things') },
      { kod: `107`, title: ru['cell-credits'], style: bold, ...gitItems('cell-credits') },
      { kod: `107`, title: ru['procent-rate'], style: bold, ...gitItems('procent-rate') },
    ]
    next()
  } catch(e) {
    res.status(500).json({ values: e.message })
    console.error(e);
  }
}