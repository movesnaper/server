const type = {
  dt: { key: 'ct', text: 'Кредит' },
  ct: { key: 'dt', text: 'Дебет' },
}

const get = async (req, res) => {
  try {
    const accounts = await require('./account').query(req.db)
    const options = accounts.filter((v) => v.key !== req.query.value)
      .map(({ key }) => ({ key, value: key }))
    const { count } = accounts.find((v) => v.key === req.query.value) || {}
    return [
      { is: 'date-picker', key: 'date', text: 'Дата', width: '10%'},
      { is: 'selector', ...type[req.query.key], options, width: '15%'},
      { key: 'description', text: 'Описание' },
      { key: 'document', text: 'Документ', width: '10%'},
      count && { key: 'count', text: 'К-во', width: '10%' },
      { key: 'summ', text: 'Сумма', width: '15%' }      
    ].filter((v) => v)
  } catch(e) {
    console.error(e);
    res.status(e.status)
  }

}

module.exports = { get }