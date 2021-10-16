module.exports = (req) => {
  return [
    { row: 'my-3', children: [
      { value: `1.3. Полученные денежные средства по предоставленным займам` },
      { col: 'mt-3 end-text', is: 'i', style: { 'font-size': '14px'}, value: 'тысяч российских рублей' }
    ]},
    { row: 'grey', children: [
        { col: 'col border flex-center center-text', value: `Сумма денежных средств, поступивщих от заёмщиков за отчётный период
         в погащение задолженности по основному долгу по предоставленным займам` },
        { col: 'col border flex-center center-text', value: `Сумма денежных средств, поступивщих от заёмщиков за отчётный период
         в погащение задолженности по процентам по предоставленным займам` },
        { col: 'col border flex-center center-text', value: `Сумма денежных средств от реализации невостребованных вещей, поступивщих за отчётный период
         в погащение задолженности по основному долгу по предоставленным займам` },
        { col: 'col border flex-center center-text', value: `Сумма денежных средств от реализации невостребованных вещей, поступивщих за отчётный период
         в погащение задолженности по процентам по предоставленным займам` },
      ]
    },
    { row: 'grey', children: [
      { col: 'col border center-text', is: 'strong', value: '21'},
      { col: 'col border center-text', is: 'strong', value: '22'},
      { col: 'col border center-text', is: 'strong', value: '23'},
      { col: 'col border center-text', is: 'strong', value: '24'},
    ]},
    { children: [
      { col: 'col border center-text', value: '819'},
      { col: 'col border center-text', value: '138'},
      { col: 'col border center-text', value: '-'},
      { col: 'col border center-text', value: '-'},
    ]}
  ]
}