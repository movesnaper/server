const selectors = require('../../../../selectors')
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