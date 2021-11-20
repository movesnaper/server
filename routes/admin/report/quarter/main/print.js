
const { title, tabs } = require('./header')


const get = async (req, res) => {
  const { periods, header } = await require(`../header`)(req, res)
  const getValues = ({key}) => require(`./${key}`).values(req, res)
  const values = await Promise.all(tabs.map(getValues))
  try {
    res.json([
      { row: 'my-3', children: [
        { col: 'col', style: 'max-width: fit-content;', is: 'strong', value: title },
        { col: 'col-2', is: 'selector', attrs: { key: 'period', options: periods }},
      ] },
      { col: 'my-3', children: header},
      ...values.reduce((cur, v) => [...cur, ...v], []),
      { row: 'my-3', children: [{ col: 'col-2' }, { col: 'col', children: require(`../../sign`)(req, res) }] }
    ])
  } catch(e) {
    res.status(500).json({ message: e.message })
    console.error(e);
  }
}

module.exports = { get }