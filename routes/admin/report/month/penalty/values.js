const { toNumber } = require('../../functions')
const title = {
  ssuda: 'Сумма задолжности по финансовым кредитам, не возвращённых в срок, указанный в договоре, в том числе:',
  procent: 'Сумма начисленных процентов за пользование финансовыми кредитами, не возвращённых в срок, указанный в договоре, в том числе:',
  penalty: 'Начисленная неустойка (пеня), за просрочку по предоставленным финансовым кредитам, не возвращённых в срок, указанный в договоре, в том числе:',
  count: 'Количество кредитных договоров, не возвращённых в срок, указанный в договоре, в том числе:',
  golg: 'изделий из драгоценных металлов и драгоценных камней',
  before: 'просроченная до 1 месяца',
  after: 'просроченная после 1 месяца'
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
      const start = req.issued.start.filter(filter).reduce(summ(key), 0)
      const end = req.issued.end.filter(filter).reduce(summ(key), 0)
      return { start: toThousand(start), end: toThousand(end) }
    }
    const getValues = ({kod, key}) => {
      return [
        { kod: `0${kod}`, title: title[key], style: bold, ...gitItems(key) },
        { kod: `0${kod + 1}`, title: title['golg'], style: padding, ...gitItems(key, filter['gold']) },
        { kod: `0${kod + 2}`, title: title['before'], style: padding, ...gitItems(key, filter['before']) },
        { kod: `0${kod + 3}`, title: title['after'], style: padding, ...gitItems(key, filter['after']) },
      ]
    }
    req.values = [
      req.header.reduce((curr, {key}, i) => ({ ...curr, [key]: i + 1, style: `${bold}${center}` }), {}),
      ...getValues({ kod: 10, key: 'ssuda' }),
      ...getValues({ kod: 20, key: 'procent' }),
      ...getValues({ kod: 30, key: 'penalty' }),
      ...getValues({ kod: 40, key: 'count' })     
    ]
    next()
  } catch(e) {
    res.status(500).json({ values: e.message })
    console.error(e);
  }
}