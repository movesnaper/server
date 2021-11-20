
const { summ, toThousand } = require("../../../functions")
const { credits, gold, transport, things, other } = require("../../../filters")


const values = async (req, res) => {
  const {values} = await require('../values')(req, res)
  const getValue = (filter) => {
    const creditsValues = values.filter(credits).filter(filter)
    const count = creditsValues.length
    const total = creditsValues.reduce(summ, 0)
    return {
      total: toThousand(total) || '-',
      count: count || '-',
      // rate: count ? Math.round(total / count * 100) : '-' 
    }
  }
  
    return [
      { col: 'my-3 center-text', is: 'h6', value: `3. Средневзвешенные значения полной стоимости
       займов некредитной финансовой организации, осуществляющей деятельность ломбардов`},
       { row: 'grey', children: [
          { col: 'col-1 border flex-center center-text', value: `Номер строки` },
          { col: 'col border flex-center center-text', value: `Категории замов` },
          { col: 'col border flex-center center-text', value: `Средневзвешенное значение
          полной стоимости замов (в процентах)` },
          { col: 'col border flex-center center-text', value: `Общая сумма предоставленных
          займов за последний квартал отчётного периода, тысяч российских рублей` },
          { col: 'col border flex-center center-text', value: `Количество договоров займов,
          заключённых за последнийй квартал отчётного периода, шт.` }
        ]
      },
      { row: 'grey', children: [
        { col: 'col-1 border center-text', is: 'strong', value: '41'},
        { col: 'col border center-text', is: 'strong', value: '42'},
        { col: 'col border center-text', is: 'strong', value: '43'},
        { col: 'col border center-text', is: 'strong', value: '44'},
        { col: 'col border center-text', is: 'strong', value: '45'},
      ]},
      ...[{ filter: gold, value: `Займы с обеспечением в виде залога лома
        и изделий из драгоценных металлов и драгоценных камней`},
        { filter: transport, value: `Займы с обеспечением в виде залога транспортного средства`},
        { filter: things, value: `Займы с обеспечением в виде залога бытовой техники`},
        { filter: other, value: `Займы с обеспечением в виде залога иного имущества`}
      ].map(({ filter, value }, i) => {
        const { rate, total, count } = getValue(filter)
        return {children: [
          { col: 'col-1 border flex-center center-text grey', value: i + 1 },
          { col: 'col border grey', value },
          { col: 'col border flex-center center-text', value: rate },
          { col: 'col border flex-center center-text', value: total },
          { col: 'col border flex-center center-text', value: count }
        ]}
      })
    ]
}
const get = async (req, res) => {
  try {
    res.status(200).json(await values(req, res))
  } catch(e) {
    console.error(e);
    res.status(500).json({ average: e.message })
  }
}

module.exports = { get, values }