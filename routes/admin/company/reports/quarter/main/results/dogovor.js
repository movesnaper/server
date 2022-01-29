module.exports = (req) => {
  return [
    { row: 'my-3', children: [
      { value: `1.4. Информация о договорах займа` },
    ]},
    { row: 'grey', children: [
        { row: 'border center-text', value: `Количество договогов займа,
          по которым на конец отчётного периода обязательства не погашены или заложенные вещи не проданы, шт.`,
          children: [
          { col: 'col border flex-center center-text', value: `общее количество договогов займа, по которым на конец
            отчётного периода обязательства не погашены или заложенные вещи не прданы` },
          { col: 'col border flex-center center-text', value: `количество договогов займа, обязательства по которым
            не погашены в установленный срок и которые находятся на льготном месячном сроке` },
          { col: 'col border flex-center center-text', value: `количество договогов займа, по которым истёк льготный
            месячный срок, но обязательства по ним не погашены или заложенное имущество ещё не продано` },
          ]
        },
        { col: 'col-2 border flex-center center-text', value: `Количество заёмщиков на конец отчётного периода, чел.` },
        { col: 'col-2 border flex-center center-text', value: `Количество договогов займа, заключённых за отчётный период, шт.` }
      ]
    },
    { row: 'grey', children: [
      { col: 'col border center-text', is: 'strong', value: '25'},
      { col: 'col border center-text', is: 'strong', value: '26'},
      { col: 'col border center-text', is: 'strong', value: '27'},
      { col: 'col-2 border center-text', is: 'strong', value: '28'},
      { col: 'col-2 border center-text', is: 'strong', value: '29'},
    ]},
    { children: [
      { col: 'col border center-text', value: '26'},
      { col: 'col border center-text', value: '1'},
      { col: 'col border center-text', value: '-'},
      { col: 'col-2 border center-text', value: '22'},
      { col: 'col-2 border center-text', value: '141'},
    ]}
  ]
}