const center = 'text-align: center;'

module.exports = ({ company, lombard }) => ({ 
  key: 'penalty', 
  text: '0203 Задолжность по кредитам',
  title: 'Форма 0203. Отчёт о наличии задолжности по финансовым кредитам, не возвращённых в срок, указанный в договоре (ежемесячный)',
  currency: 'тыс.росс.руб',
  minfin: company.minfin,
  lombard,
  headers: [
    { key: 'title', text: 'Наименование показателя' },
    { key: 'kod', text: 'Код строки', style: center},
    { key: 'start', text: 'На начало отчётного месяца', style: center },
    { key: 'end', text: 'На конец отчётного месяца', style: center }
  ] 
})