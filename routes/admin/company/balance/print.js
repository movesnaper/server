const get = async (req, res) => {
  try {
    const headers = (await require('./schema').get(req, res))['table-headers']
    return [
      { is: 'report-table', attrs: { hovered: 'cell', headers }}
    ]
  } catch(e){
    console.log(e);
    res.status(500).json(e)
  }
};

module.exports = { get }