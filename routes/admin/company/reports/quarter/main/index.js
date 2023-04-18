

const { title, tabs } = require('./header')

const get = async (req, res) => {
  try {
    const {schema} = await require(`./schema`)({ title, tabs })(req, res)
    return schema
  } catch(e){
    console.log(e);
    res.status(500).json(e)
  }
};

module.exports = { get }