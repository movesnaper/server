module.exports = (req) => {
  return [
    { row: 'my-3', children: [
      { value: `1.5. Иные сведения по договорам займа` },
      { col: 'mt-3 end-text', is: 'i', style: { 'font-size': '14px'}, value: 'тысяч российских рублей' }
    ]},
    { row: 'grey', children: [
        { col: 'col border flex-center center-text', value: `Сумма задолжности по договорам займа,
         реструктуризованной в отчётном периоде` },
        { col: 'col border flex-center center-text', value: `Сумма задолжности по основному долгу
         по договорам займа, списанной в отчётном периоде` },
        { col: 'col-6 border flex-center center-text', value: `Сумма денежных средств, подлежащая
         получению некредитной финансовой организацией, осуществляющей деятельность ломбардов, в результате реализации невостребованных вещей, на конец отчётного периода` }
      ]
    },
    { row: 'grey', children: [
      { col: 'col border center-text', is: 'strong', value: '30'},
      { col: 'col border center-text', is: 'strong', value: '31'},
      { col: 'col-6 border center-text', is: 'strong', value: '32'},
    ]},
    { children: [
      { col: 'col border center-text', value: '-'},
      { col: 'col border center-text', value: '-'},
      { col: 'col-6 border center-text', value: '-'},
    ]}
  ]
}