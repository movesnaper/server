const get = async (req, res) => {
  const { schema } = await require('./index').values(req, res)
  try {
    return [
      ...schema,
      { row: 'my-3', children: [{ col: 'col-4'}, { col: 'col', children: require(`../../sign`)(req, res) }]}
    ]
  } catch(e){
    console.log(e);
    res.status(500).json(e)
  }
};

module.exports = { get }