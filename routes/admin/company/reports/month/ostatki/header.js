const title = 'Ведомость остатков'
const right="text-align: right"
const headers = [
  { key: 'index', value: '#'},
  { key: 'number', value: 'Билет', is: 'th'  },
  { key: 'date', value: 'Дата', type: 'date' },
  { key: 'klient', value: 'ФИО' },
  { key: 'ssuda', value: 'Ссуда', type: 'double', style: right, is: 'th' },
  { key: 'title', value: 'Наименование', style: right},
  { key: 'proba', value: 'Проба' },
  { key: 'ves', value: 'вес', style: right },
  { key: 'price', value: 'Цена', style: right },
  { key: 'ocenca', value: 'Оценка', style: right }
]

module.exports = { headers, title }