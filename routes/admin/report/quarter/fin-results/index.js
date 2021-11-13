
const headers = [
  { key: 'title', value: 'Наименование показателя' },
  { key: 'kod', value: 'Код строки' },
  { key: 'end', value: 'За отчётный квартал' },
  { key: 'start', value: 'С начала года' }
]

const get = async (req, res) => {
  const { selectors, period, header } = await require(`../header`)(req, res)
  try {
    res.json([
      { row: 'my-3', children: [...selectors, { is: 'print' }] },
      { is: 'strong', value: 'Форма 0202. Финансовый результат (ежеквартальный)' },
      { row: 'my-3', children: period },
      ...header,
      { row: 'my-3', children: [ 
        { col: 'col', is: 'report-table', attrs: { headers, hovered: 'row' }}
      ]},
    ])
  } catch(e){
    console.log(e);
    res.status(500).json({ message: e.message })
  }
}



module.exports = { get }