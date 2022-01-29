
module.exports = (req) => {
  return [
    { row: 'my-3', children: [
      { value: `1.1. Задолженность по основному долгу по предоставленным займам` },
      { col: 'mt-3 end-text', is: 'i', style: { 'font-size': '14px'}, value: 'тысяч российских рублей' }
    ]},
    { row: 'grey', children: [
        { col: 'col-4 border flex-center center-text', value: `Сумма займов, выданных за отчётный период` },
        { row: 'border center-text', value: `Сумма задолженности по основному долгу
           по предоставленным займам на конец отчётного периода:`,
          children: [
            { col: 'col border flex-center center-text', value: `общая сумма задолженности по основному долгу по предоставленным займам`},
            { col: 'col border flex-center center-text', value: `сумма задолженности по основному долгу по предоставленным займам,
             по предоставленным займам, не погашенным в срок, установленный договором займа`
            }
          ]
        },
      ]
    },
    { row: 'grey', children: [
      { col: 'col border center-text', is: 'strong', value: '15'},
      { col: 'col border center-text', is: 'strong', value: '16'},
      { col: 'col border center-text', is: 'strong', value: '17'},
    ]},
    { children: [
      { col: 'col border center-text', value: '847'},
      { col: 'col border center-text', value: '182'},
      { col: 'col border center-text', value: '4'},
    ]}
  ]
}