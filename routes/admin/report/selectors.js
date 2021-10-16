const selectors = require('../../../selectors')
module.exports = {
  ...selectors,
  find: (db) => ({selector, fields}) => {
    const lombard = selector.lombard || { $exists: true }
    return db.find({ 
      fields,
      limit: selectors.limit,
      selector: selectors.values({...selector, lombard})
    })
  }
}
    // const selector = values({ start, end, lombard: req.query.lombard || { $exists: true }})
    // const { docs } = await req.db.find({ selector, fields: ['date', 'values'], limit})