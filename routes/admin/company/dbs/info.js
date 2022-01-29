

const get = async (req, res) => {
  try {
    const programs = await req.db.query(`company/programs`)
    const schema = await req.db.query(`company/schema`)
    const users = await req.db.query(`company/users`)
    const klients = await req.db.query(`company/klients`)
    const lombards = await req.db.query(`company/lombards`)
    const pendings = await require(`./pendings`).get(req, res)

    return [
      { key: 'programs', info: programs.total_rows },
      { key: 'programs', info: programs.total_rows },
      { key: 'schema', info: schema.total_rows },
      { key: 'users', info: users.total_rows },
      { key: 'klients', info: klients.total_rows },
      { key: 'lombards', info: lombards.total_rows },
      { key: 'pendings', info: pendings.total_rows }
    ]
  } catch(e) {
    console.error(e);
    res.status(500).json(e)
  }
}


module.exports = { get }