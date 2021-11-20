const headers = [
  { value: 'Баланс', width: '10%', children: [
    { key: 'account', value: 'Счёт', width: '10%' },
  ]},
  { is: 'date-picker', attrs: { label: 'Начальный остаток',  key: 'start' }, children: [
    { key: 'startDt', value: 'Дт', width: '10%' },
    { key: 'startCt', value: 'Кт', width: '10%' },
  ]},
  { key: 'dt', value: 'Дт', width: '10%' },
  { key: 'ct', value: 'Кт', width: '10%' },
  { is: 'date-picker', attrs: { label: 'Конечный остаток', key: 'end' }, children: [
    { key: 'endDt', value: 'Дт', width: '10%' },
    { key: 'endCt', value: 'Кт', width: '10%' }
  ]}
]

module.exports = { headers }