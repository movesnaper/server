const toThousand = (v) => Math.round(v / 1000) || '-'
const other = ['62', '68', '69', '70', '71']

const get = async (req, res) => {
  const { dt, ct } = await require('../values')(req, res)
  const getValue = (method, ...accounts) => 
    toThousand(accounts.map((acc) => 
      method(acc).end).reduce((cur, v) => cur += v, 0))
  try {
    const values = [
      { col: 'my-3 center-text', is: 'h6', value: `5. Балансовые показатели`},
       { row: 'grey', children: [
        { col: 'col-1 border flex-center center-text', value: `Номер строки` },
        { col: 'col border flex-center center-text', value: `Наименование показателя` },
        { col: 'col-2 border flex-center center-text', value: `Значение показателя` }
      ]
    },
    { row: 'grey', children: [
      { col: 'col-1 border center-text', is: 'strong', value: '1'},
      { col: 'col border center-text', is: 'strong', value: '2'},
      { col: 'col-2 border center-text', is: 'strong', value: '3'}
    ]},
    ...[{ key: '1', title: 'Активы, в том числе:', rows: [
        { key: '1.1', value: getValue(dt, '377', '703'), title: `финансовые вложения 
        (задолжность по предоставленным займам)`},
        { key: '1.1.1', value: getValue(dt, '377'), title: `задолженность по основному долгу`},
        { key: '1.1.2', value: getValue(dt, '703'), title: `задолженность по процентам`},
        { key: '1.2', value: getValue(dt, ...other), title: `дебиторская задолженность`},
        { key: '1.3', value: getValue(dt, '200'), title: `запасы`},
        { key: '1.4', value: getValue(dt, '01'), title: `основные средства`},
        { key: '1.5', value: getValue(dt, '301', '311'), title: `денежные средства, в том числе:`},
        { key: '1.5.1', value: getValue(dt, '311'), title: `на банковских счетах`},
        { key: '1.5.2', value: getValue(dt, '301'), title: `в кассе`},
        { key: '1.6', value: '-', title: `прочие активы`},
      ]}, 
      { key: '2', title: 'Капитал, в том числе:', rows: [
        { key: '2.1', value: getValue(ct, '81'), title: `уставной капитал`},
        { key: '2.2', value: getValue(ct, '82'), title: `резервный капитал`},
        { key: '2.3', value: getValue(ct, '83'), title: `добавочный капитал`},
        { key: '2.4', value: getValue(ct, '84'), title: `нераспределённая прибыль
         (непокрытый убыток)`},
        { key: '2.5', value: '-', title: `прочие составляющие капитала`},
      ]}, 
      { key: '3', title: 'Обязательства, в том числе:', rows: [
        { key: '3.1', value: getValue(ct, ...other), title: `кредиторская задолженность ломбарда`},
        { key: '3.2', value: '-', title: `прочие обязательства`},
        
      ]}
      ].reduce((cur, { key, title, rows }, i) => {
        return [...cur, { children: [
              { col: 'col-1 border grey', is: 'strong', value: key },
              { col: 'col border grey', is: 'strong', value: title },
              { col: 'col-2 border flex-center center-text' }
          ]},
          ...rows.map(({ key, value, title }) => {
            return { children: [
              { col: 'col-1 border grey', value: key },
              { col: 'col border grey', value: title },
              { col: 'col-2 border flex-center center-text', value }
            ]}
          })
        ]
      }, [])
    ]
    res.status(200).json(values)
  } catch(e) {
    console.error(e);
    res.status(500).json({ balance: e.message })
  }
}

module.exports = { get }