module.exports = (req) => {
  return [
    { row: 'my-3', children: [
      { value: `1.2. Задолженность по процентам по предоставленным займам`},
      { col: 'mt-3 end-text', is: 'i', style: { 'font-size': '14px'}, value: 'тысяч российских рублей'}
    ]},
    { row: 'grey', children: [
        { col: 'col-4 border flex-center center-text', value: 'Сумма начисленных процентов по предоставленным займам'},
        { row: 'border center-text', value: `Сумма задолженности по процентам по предоставленным займам
          конец отчётного периода:`,
          children: [
            { col: 'col border flex-center center-text', value: `общая сумма задолженности по процентам по предоставленным займам`},
            { col: 'col border flex-center center-text', value: `сумма задолженности по процентам по предоставленным займам,
            не погашенным в срок, установленный договором займа`
            }
          ]
        },
      ]
    },
    { row: 'grey', children: [
      { col: 'col border center-text', is: 'strong', value: '18'},
      { col: 'col border center-text', is: 'strong', value: '19'},
      { col: 'col border center-text', is: 'strong', value: '20'},
    ]},
    { children: [
      { col: 'col border center-text', value: '138'},
      { col: 'col border center-text', value: '-'},
      { col: 'col border center-text', value: '-'},
    ]}
  ]
}