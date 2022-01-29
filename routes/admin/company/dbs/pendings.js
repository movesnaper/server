

const get = async (req, res) => {
  try {
    const {rows: issued} = await req.db.query(`company/issued`)
    const {rows: payed} = await req.db.query(`company/payed`)
    const payedIds = payed.map((v) => v.id)
    const pendings = issued.filter((v) => !payedIds.includes(v.id))
    return { rows: pendings, total_rows: pendings.length }
  } catch(e) {
    console.error(e);
    res.status(500).json(e)
  }
}


module.exports = { get }