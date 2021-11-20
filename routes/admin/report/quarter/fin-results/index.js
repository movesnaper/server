const { title, headers } = require('./header')
const values = (req, res) => require(`./schema`)({ title, headers})(req, res)
const get = async (req, res) => {
  const {schema} = await values(req, res)
  try {
    res.json([
      { row: 'my-3', children: [ {}, { col: 'col-1', is: 'print' } ] },      
      ...schema
    ])
  } catch(e){
    console.log(e);
    res.status(500).json({ kassa: e.message })
  }
};

module.exports = { get, values }