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

const summ = (key) => (cur, v) => cur += toNumber(v[key])

const toThousand = (v) => {
  const start = Math.floor(v.start / 1000)
  const end = Math.floor(v.end / 1000)
  return {...v, start, end }
}

const bold = 'font-weight: 700;'

const center = 'text-align: center;'

const padding = 'padding-left: 50px;'

const get = async (req, res) => {
  const { start = [], end = [] } = await require('./issued')(req, res)
  try {
    const gitItems = (key, filter = () => true) => {
      return { 
        start: start.filter(filter).reduce(summ(key), 0), 
        end: end.filter(filter).reduce(summ(key), 0)
      }
    }
    const getValues = (key, kod) => {
      return [
        { kod: `0${kod}`, title: title[key], style: bold, ...gitItems(key) },
        { kod: `0${kod + 1}`, title: title['golg'], style: padding, ...gitItems(key, filter['gold']) },
        { kod: `0${kod + 2}`, title: title['before'], style: padding, ...gitItems(key, filter['before']) },
        { kod: `0${kod + 3}`, title: title['after'], style: padding, ...gitItems(key, filter['after']) },
      ]
    }
    res.status(200).json({
      values: [
        { title: 1, kod: 2, start: 3, end: 4, style: bold + center },
        ...getValues('ssuda', 10).map(toThousand),
        ...getValues('procent', 20).map(toThousand),
        ...getValues('penalty', 30).map(toThousand),
        ...getValues('count', 40)     
      ]
    })
  } catch(e) {
    res.status(500).json({ values: e.message })
    console.error(e);
  }
}

module.exports = { get }