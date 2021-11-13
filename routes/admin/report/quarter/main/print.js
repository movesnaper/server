
const { tabs, title } = require('./header')

const get = async (req, res) => {
  const { value: period = '' } = require('../period')(req, res)
  if(!period) throw new Error('no period specified')
  const { header } = await require(`../header`)(req, res)
  const getValues = ({key}) => require(`./${key}`)(req, res)
  const values = await Promise.all(tabs.map(getValues))
  try {
    res.json([
      { row: 'my-3', children: [ 
        { is: 'strong', value: title },
        { value: `По состоянию на ${period}`}
      ]},
      ...header,
      ...values.reduce((cur, v) => [...cur, ...v], []),
      ...require(`../../sign`)(req, res)
    ])
  } catch(e) {
    res.status(500).json({ message: e.message })
    console.error(e);
  }
}

module.exports = { get }