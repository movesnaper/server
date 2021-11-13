const center = 'text-align: center;'
const title = `Форма 0203. Отчёт о наличии задолжности по финансовым кредитам,
 не возвращённых в срок, указанный в договоре (ежемесячный)`
const headers = [
  { key: 'title', value: 'Наименование показателя' },
  { key: 'kod', value: 'Код строки', style: center},
  { key: 'start', value: 'На начало отчётного месяца', style: center },
  { key: 'end', value: 'На конец отчётного месяца', style: center }
]

module.exports = { headers, title }