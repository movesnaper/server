const center = 'text-align: center;'

module.exports = ({ company, lombard }) => ({ 
  key: 'fin-results', 
  text: '0202 Деятельность ломбарда',
  title: 'Форма 0202. Отчёт о деятельности ломбарда (ежеквартальный)',
  minfin: company.minfin,
  lombard,
  headers: [
    { key: 'title', text: 'Наименование показателя' },
    { key: 'kod', text: 'Код строки', style: center},
    { key: 'end', text: 'За отчётный квартал', style: center },
    { key: 'start', text: 'С начала года', style: center }
  ]
})