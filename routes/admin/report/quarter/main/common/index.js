const get = async (req, res) => {
  try {
    const values = [
      { col: 'my-3 center-text', is: 'h6', value: `1. Общие сведения о некредитной финансовой организации,
       осуществляющей деятельность ломбардов`},
      ... await require("./company")(req, res),
      { col: 'my-3 center-text', is: 'h6', value: `2. Сведения о банковских счетах некредитной финансовой
       организации, осуществляющей деятельность ломбардов`},
      ... await require("./bank")(req, res),
      { col: 'my-3 center-text', is: 'h6', value: `3. Сведения о страховых организациях, осуществляющих
       страхование имущества, переданного некредитной финансовой организации
        осуществляющей деятельность ломбардов, в залог`},
      ... await require("./insuarance")(req, res),
    ]
    res.status(200).json(values)
  } catch(e) {
    console.error(e);
    res.status(500).json({ common: e.message })
  }
}

module.exports = { get }