
module.exports = async (req, res) => {
  try {
    const noPeriod = !req.query.key && [{ children: [{ col: 'border center-text grey', 
      style: {
        height: '300px',
        display: 'flex',
        'flex-direction': 'column',
        'justify-content': 'center'
      },
      value: `Пожалуйста, выберите период`
      }
    ]}]
    return noPeriod || await require(`./${req.query.key}`)(req, res)
  } catch(e) {
    console.error(e);
    res.status(500).json({ 'tabs': e.message })
  }

}