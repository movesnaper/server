const { title, headers } = require('./header')

const get = async (req, res) => {
  const {schema} = await require(`./schema`)({ title, headers})(req, res)
  try {
    return schema
  } catch(e){
    console.log(e);
    res.status(500).json({ kassa: e.message })
  }
};

module.exports = { get }