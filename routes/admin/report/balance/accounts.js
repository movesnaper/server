

module.exports = async (req, res) => {
  try {
    const { settings } = await req.db.get('company')
    return [...new Set([...settings.dt, ...settings.ct]
      .map((v) => v.key))].sort((a, b) => a.localeCompare(b))
  } catch(e) {
    console.error(e);
  }

}