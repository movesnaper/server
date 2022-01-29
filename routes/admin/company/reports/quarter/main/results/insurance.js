module.exports = (req) => {
  return [
    { row: 'grey', children: [
        { col: 'col border flex-center center-text', value: `Количество договоров страхования вещей,
         принятых в залог, заключённых за отчётный период, шт.` },
        { col: 'col-4 border flex-center center-text', value: `Сумма страховой премии (страховых взносов),
         уплпченной (уплаченных) за отчётный период некредитной финансовой организации, осуществляющей деятельность ломбардов, некредитным финансовым 
        организациям, осуществляющим деятельность субъектов страхового дела, тысяч российских рублей` },
        { col: 'col border flex-center center-text', value: `Страховая сумма, на которую застрахованы 
        вещи, принятые в залог на конец отчётного периода, тысяч российских рублей` },
        { col: 'col border flex-center center-text', value: `Количество страховых случаев, наступивших за 
        отчётный период, шт.` },
        { col: 'col-3 border flex-center center-text', value: `Сумма выплат по страховым случаям, осуществлённых некредитными финансовыми организациями,
         осуществляющих деятельность субъектов страхового дела, за отчётный период, тысяч российских рублей` },
      ]
    },
    { row: 'grey', children: [
      { col: 'col border center-text', is: 'strong', value: '36'},
      { col: 'col-4 border center-text', is: 'strong', value: '37'},
      { col: 'col border center-text', is: 'strong', value: '38'},
      { col: 'col border center-text', is: 'strong', value: '39'},
      { col: 'col-3 border center-text', is: 'strong', value: '40'},
    ]},
    { children: [
      { col: 'col border center-text', value: '-'},
      { col: 'col-4 border center-text', value: '-'},
      { col: 'col border center-text', value: '-'},
      { col: 'col border center-text', value: '-'},
      { col: 'col-3 border center-text', value: '-'},
    ]}
  ]
}