module.exports = ({title, tabs}) => async (req, res) => {
  const { periods, header, years } = await require(`../header`)(req, res)
    const schema = [
      { row: 'my-3', children: [
        { col: 'col', style: 'max-width: fit-content;', is: 'strong', value: title },
        { col: 'col-2', is: 'selector', attrs: { key: 'period', options: periods }},
        { col: 'col-1', is: 'selector', attrs: { key: 'year', options: years }},
      ] },
      { col: 'my-3', children: header},
      { row: 'mt-3', children: [ { is: 'tabs', attrs: { values: tabs }} ]},
    ]
    return { schema }
};
