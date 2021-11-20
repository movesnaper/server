const { title, headers } = require('./header')
const values = (req, res) => require(`../schema`)({ title, headers})(req, res)
const get = async (req, res) => {
  try {
    const {schema, lombards} = await values(req, res)
    res.json([
      { row: 'my-3', children: [
        {},    
        { col: 'col-3', is: 'selector', attrs: { key: 'lombard', options: lombards } },
        { col: 'col-1', is: 'print' }
      ] },
      ...schema
    ])
  } catch(e){
    console.log(e);
    res.status(500).json(e)
  }
};

module.exports = { get, values }