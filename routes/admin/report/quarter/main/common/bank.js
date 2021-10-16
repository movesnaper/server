const { getAddress, moment } = require('./functions')

module.exports = ({company}, res) => {
  try {
    return [
      { row: 'grey', children: [
          { col: 'col-2 border flex-center center-text', value: `Порядковый номер` },
          { col: 'col border flex-center center-text', value: `Полное фирменное наименование
           некредитной финансовой организации` },
          { col: 'col border flex-center center-text', value: `Местонахождение кредитной
           финансовой организации` },
          { col: 'col border flex-center center-text', value: `Регистрационный номер записи
           кредитной организации, в Государственном реестре кредитных организаций и некредитных
            финансовых организаций Донецкой Народной Республики` },
          { col: 'col border flex-center center-text', value: `Номер счёта` },
          { col: 'col border flex-center center-text', value: `Дата открытия счёта` },
        ]
      },
      { row: 'grey', children: [
        { col: 'col-2 border center-text', is: 'strong', value: '4'},
        { col: 'col border center-text', is: 'strong', value: '5'},
        { col: 'col border center-text', is: 'strong', value: '6'},
        { col: 'col border center-text', is: 'strong', value: '7'},
        { col: 'col border center-text', is: 'strong', value: '8'},
        { col: 'col border center-text', is: 'strong', value: '9'},
      ]},
      ...company.bank.map(({ bank, address, number, date }, i) => {
        return { children: [
          { col: 'col-2 border center-text', value: i + 1},
          { col: 'col border center-text', value: bank.name || '-'},
          { col: 'col border center-text', value: getAddress(address)},
          { col: 'col border center-text', value: bank.idn || '-'},
          { col: 'col border center-text', value: number || '-'},
          { col: 'col border center-text', value: moment(date).format('DD.MM.YYYY') || '-'},
        ]}
      })
    ]
  } catch(e) {
    console.error(e);
    res.status(500).json({ bank: e.message })
  }
}