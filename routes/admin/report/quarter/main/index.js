
const tabs = [
  { key: 'common', title: 'Общие сведения' },
  { key: 'results', title: 'Основные показатели' },
  { key: 'average', title: 'Средняя стоимость займов' },
  { key: 'money', title: 'Денежные операции' },
  { key: 'balance', title: 'Балансовые показатели' },
  { key: 'guaranty', title: 'Информация о залогах' }
]

const get = async (req, res) => {
  const { selectors, period, header } = await require(`../header`)(req, res)
  try {
    res.json([ 
      { row: 'my-3', children: [...selectors, { is: 'print' }] },
      { is: 'strong', value: `Форма 0201. Отчёт о деятельности некредитных финансовых организаци,
        осуществляющей деятельность ломбардов` },
      { row: 'my-3', children: period },
      ...header,
      { row: 'mt-3', children: [ { is: 'tabs', attrs: { values: tabs }} ]},
    ])
  } catch(e) {
    res.status(500).json({ message: e.message })
    console.error(e);
  }
}

module.exports = { get }