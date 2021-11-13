
const get = async (req, res) => {
  try {
    const values = [
      { col: 'center-text', is: 'h6', value: `1. Сведения о займах` },
      ...require("./credits")(req, res),
      ...require("./procents")(req, res),
      ...require("./payed")(req, res),
      ...require("./dogovor")(req, res),
      ...require("./dogovorOthers")(req, res),
      { col: 'my-3 center-text', is: 'h6', value: `2. Сведения о денежных средствах физических лиц-участников (учредителей) некредитной финансовой организации, осуществляющей деятельность ломбардов,
      предоставленных некредитной финансовой организации, осуществляющей деятельность ломбардов`},
      ...require("./money")(req, res),
      { col: 'my-3 center-text', is: 'h6', value: `3. Информация о страховании рисков некредитной финансовой организации,
      осуществляющей деятельность ломбардов, связанных с вещами, принятыми в залог` },
      ...require("./insurance")(req, res)
    ]
    res.status(200).json(values)
  } catch(e) {
    console.error(e);
    res.status(500).json({ results: e.message })
  }
}

module.exports = { get }