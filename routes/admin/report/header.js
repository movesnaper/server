module.exports = ({ title, kod }) => {
    return [
      { children: [
        { col: 'col border', value: `Наименование финансового учреждения`},
        { col: 'col border', value: title }
      ]},
      { children: [
        { col: 'col border', value: `Код финансового учреждения`},
        { col: 'col border', value: kod }
      ]}
    ]
}