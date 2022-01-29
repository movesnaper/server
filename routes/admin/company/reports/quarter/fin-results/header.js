const title = 'Форма 0202. Финансовый результат (ежеквартальный) по состоянию на' 
const bold = 'font-weight: 600;'
const headers = [
  { key: 'title', value: 'Наименование показателя' },
  { key: 'kod', value: 'Код строки', style: bold },
  { key: 'end', value: 'За отчётный квартал' },
  { key: 'start', value: 'С начала года' }
]

module.exports = { title, headers }