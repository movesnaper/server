
module.exports = (req, res) => {
  const { director, bookkeeper } = req.company
  try {
    return [
      { row: 'my-4', children: [
        { col: 'col', value: `Руководитель` },
        { col: 'col', is: 'sign', attrs: {
          subtitle: '(фамилия, инициалы)',
          value: director
        } }
      ]},
      { row: 'my-4', children: [
        { col: 'col', value: `Главный бухгалтер` },
        { col: 'col', is: 'sign', attrs: {
          subtitle: '(фамилия, инициалы)',
          value: bookkeeper
        } },
      ]},
      { row: 'my-4', children: [
        { col: 'col', value: `Дата составления` },
        { col: 'col', style: {'border-bottom': '1px solid #8080804f' }},
      ]},
      { row: 'my-4', children: [
        { col: 'col', is: 'sign', attrs: {
          subtitle: `(фамилия, имя, отчество работника, составившего отчёт, номер телефона)`
        } },
      ]}
    ]
  } catch(e) {
    console.error(e);
    res.status(500).json({ 'sign': e.message })
  }
}