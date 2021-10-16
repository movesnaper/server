const { getAddress } = require('./functions')

module.exports = ({ company }, res) => {
  try {
    return [
      { row: 'my-3', children: [
        { value: `1. Реквизиты некредитной финансовой организации, осуществляющей деятельность ломбардов` },
      ]},
      { row: 'grey', children: [
          { col: 'col border flex-center center-text', value: `Полное фирменное наименование
          некредитной финансовой организации, осуществляющей деятельность ломбардов` },
          { col: 'col border flex-center center-text', value: `Регистрационный номер записи некредитной
          финансовой организации, осуществляющей деятельность ломбардов, в Государственном реестре 
          кредитных организаций и некредитных финансовых организаций Донецкой Народной Республики` },
          { col: 'col border flex-center center-text', value: `Местонахождение некредитной финансовой
          организации, осуществляющей деятельность ломбардов` },
        ]
      },
      { row: 'grey', children: [
        { col: 'col border center-text', is: 'strong', value: '1'},
        { col: 'col border center-text', is: 'strong', value: '2'},
        { col: 'col border center-text', is: 'strong', value: '3'},
      ]},
      { children: [
        { col: 'col border center-text', value: company.name || '-'},
        { col: 'col border center-text', value: company.idn || '-'},
        { col: 'col border center-text', value: getAddress(company.address)},
      ]}
    ]
  } catch(e) {
    console.error(e);
    res.status(500).json({ company: e.message })

  }
}