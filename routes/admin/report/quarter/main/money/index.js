const toThousand = (v) => Math.round(v / 1000) || '-'

const get = async (req, res) => {
  const { dt } = await require('../values')(req, res)
  const getValues = (filter) => dt(filter, toThousand)
  try {
    const values = [
      { col: 'my-3 center-text', is: 'h6', value: `4. Информация об операциях с денежными средствами`},
      { row: 'grey', children: [
        { col: 'col-4 border flex-center center-text', value: `Наименование показателя` },
        { col: 'col border flex-center center-text', value: `Остаток денежных средств на начало последнего 
        квартала отчётного периода` },
        { col: 'col border flex-center center-text', value: `Поступление денежных средств за 
        последний квартал отчётного периода` },
        { col: 'col border flex-center center-text', value: `Выбытие денежных средств за последний
        квартал отчётного периода` },
        { col: 'col border flex-center center-text', value: `Остаток денежных средств на конец последнего
        квартала отчётного периода` }
      ]},
      { row: 'grey', children: [
        { col: 'col-4 border center-text', is: 'strong', value: '46'},
        { col: 'col border center-text', is: 'strong', value: '47'},
        { col: 'col border center-text', is: 'strong', value: '48'},
        { col: 'col border center-text', is: 'strong', value: '49'},
        { col: 'col border center-text', is: 'strong', value: '50'},
      ]},
      ...[
        { filter: '301', value: `Наличные денежные средства`},
        { filter: '311', value: `Банковские счета`}
      ].map(({ filter, value }) => {
        const { start, dt, ct, end } = getValues(filter)
        return {children: [
          { col: 'col-4 border grey', value },
          { col: 'col border flex-center center-text', start },
          { col: 'col border flex-center center-text', value: dt },
          { col: 'col border flex-center center-text', value: ct },
          { col: 'col border flex-center center-text', value: end }
        ]}
      })
    ]
    res.status(200).json(values)
  } catch(e) {
    console.error(e);
    res.status(500).json({ money: e.message })
  }
}

module.exports = { get }