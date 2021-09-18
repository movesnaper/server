const right="text-align: right"

module.exports = ({ lombard }) => {
  return { 
    key: 'ostatki', 
    text: 'Ведомость остатков',
    lombard,
    headers: [
      { key: 'index', text: '#'},
      { key: 'number', text: 'Билет', is: 'th'  },
      { key: 'date', text: 'Дата', type: 'date' },
      { key: 'klient', text: 'ФИО' },
      { key: 'ssuda', text: 'Ссуда', type: 'double', style: right, is: 'th' },
      { key: 'title', text: 'Наименование', style: right},
      { key: 'proba', text: 'Проба' },
      { key: 'ves', text: 'вес', style: right },
      { key: 'price', text: 'Цена', style: right },
      { key: 'ocenca', text: 'Оценка', style: right }
    ]
  }
}