

const { title, tabs } = require('./header')

const get = async (req, res) => {
  try {
    const {schema} = await require(`./schema`)({ title, tabs })(req, res)
    return [
      { row: 'my-3', children: [ 
        {}, 
        // { col: 'col-1', is: 'print', url: 'print' } 
      ] },
      ...schema
    ]
  } catch(e){
    console.log(e);
    res.status(500).json(e)
  }
};

module.exports = { get }