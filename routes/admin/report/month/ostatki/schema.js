const style="text-align: right"

module.exports = ({ lombard }) => {
  return { 
    key: 'ostatki', 
    text: 'Ведомость остатков',
    lombard,
    headers: [
      { key: 'index', text: '#'},
      { key: 'bilet', text: 'Билет', is: 'th'  },
      { key: 'date', text: 'Дата', type: 'date' },
      { key: 'klient', text: 'ФИО' },
      { key: 'ssuda', text: 'Ссуда', type: 'double', style },
      { key: 'title', text: 'Наименование'},
      { key: 'proba', text: 'Проба' },
      { key: 'ves', text: 'вес', style },
      { key: 'price', text: 'Цена', style },
      { key: 'ocenca', text: 'Оценка', is: 'th', type: 'double', style }
    ]
  }
}