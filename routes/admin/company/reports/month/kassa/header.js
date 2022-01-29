const title = 'Касса ломбардов'
const headers = [
  { key: 'date', value: 'Дата' },
  { key: 'prixod', value: 'Приход'},
  { key: 'ct377', value: 'Ссуда'},
  { key: 'ct703', value: 'Процент'},
  { key: 'ct704', value: 'Пеня'},
  { key: 'totalDt', value: 'Итого Дт', is: 'th'},
  { key: 'dt377', value: 'Ссуда'},
  { key: 'dt703', value: 'Процент'},
  { key: 'rasxod', value: 'Расход'},
  { key: 'totalCt', value: 'Итого Кт', is: 'th'},
  { key: 'ok', value: 'Ок', is: 'th' }
]

module.exports = { headers, title }