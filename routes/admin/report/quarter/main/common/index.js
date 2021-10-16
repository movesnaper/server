module.exports = async (req, res) => {
  try {
    return [
      // ... await require("./header")(req, res),
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
  } catch(e) {
    console.error(e);
    res.status(500).json({ common: e.message })
  }
}