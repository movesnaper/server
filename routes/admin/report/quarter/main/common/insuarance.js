module.exports = (req, res) => {
  try {
    return [
      { row: 'grey', children: [
          { col: 'col-2 border flex-center center-text', value: `Порядковый номер` },
          { col: 'col border flex-center center-text', value: `Полное фирменное наименование 
          некредитной финансовой организации, осуществляющей деятельность субъектов страхового дела` },
          { col: 'col border flex-center center-text', value: `Местонахождение кредитной финансовой 
          организации, осуществляющей деятельность субъектов страхового дела` },
          { col: 'col border flex-center center-text', value: `Идентификационный номер налогоплательщика
          (ИНН) некредитной финансовой организации, осуществляющей деятельность субъектов страхового дела` },
          { col: 'col border flex-center center-text', value: `Регистрационный номер записи некредитной
          финансовой организации, осуществляющей деятельность субъектов страхового дела
            в Едином государственном реестре субъектов страхового дела` },
        ]
      },
      { row: 'grey', children: [
        { col: 'col-2 border center-text', is: 'strong', value: '10'},
        { col: 'col border center-text', is: 'strong', value: '11'},
        { col: 'col border center-text', is: 'strong', value: '12'},
        { col: 'col border center-text', is: 'strong', value: '13'},
        { col: 'col border center-text', is: 'strong', value: '14'},
      ]},
      { children: [
        { col: 'col-2 border center-text', value: '-'},
        { col: 'col border center-text', value: '-'},
        { col: 'col border center-text', value: '-'},
        { col: 'col border center-text', value: '-'},
        { col: 'col border center-text', value: '-'},
      ]}
    ]
  } catch(e) {
    console.error(e);
    res.status(500).json({ insuarance: e.message })
  }
}