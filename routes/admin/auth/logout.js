const { newPouchDb } = require('../../functions')
 const post = async (req, res) => {
  try {
    const db = newPouchDb()
    return db.logOut()
  } catch(err) {
    res.status(404).json(err)
  }
}



module.exports = { post }