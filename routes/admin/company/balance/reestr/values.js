const { $_, moment } = require('../../../../../functions')
const { query: accounts } = require('./account')

const descriptions = {
  'dt377-ct301': 'Выдана ссуда',
  'dt301-ct377': 'Возвращена ссуда',
  'dt301-ct703': 'Уплачены проценты',
  'dt703-ct301': 'Перерасчёт пронтов',
  'dt301-ct704': 'Уплачена пеня',
}

const getDescription = (value) => {
  const [dt] = value.dt.split('/')
  const [ct] = value.ct.split('/')
  return descriptions[`dt${dt}-ct${ct}`] || ''
}

const get =  async ({ query, db }, res) => {
  const limit = 10
  const skip = Number(limit) * Number(query.page || 0)
  try {
    const [schema] = await accounts(db, {key: query.value})
    const data = await db.query(`my_index/values_${query.key}`, {
      endkey: query.endkey,
      startkey: query.startkey,
      descending: true,
      include_docs: true,
      limit,
      skip
    })
    const rows = data.rows.map(({ value, doc}) => {
      const date = moment(doc.date).format('YYYY-MM-DD')
      const document = $_.get(doc, schema.document[query.key]) || ''
      const description = value.description || getDescription(value)
      return {...value, date, document, description }
    })
      return { rows, total: data }
    } catch(e) {
      console.error(e);
    }
  }

  const post =  async ({ body, db }, res) => {
    try {
      const { summ, description, date, document } = body.value
      const [schema] = await accounts(db, { key: body.params.value })
      const [dt, subDt] = body.value.dt ? body.value.dt.split('/') : []
      const [ct, subCt] = body.value.ct ? body.value.ct.split('/') : []
      const lombard = [subDt, subCt].find((v) => ['makeevka', 'virus'].includes(v))
      const [id, index = 0] = body.value.id ? body.value.id.split('/') : []
      const value = id ? await db.get(id) : { values: [], type: 'reestr'}
      value.values.splice(index, 1, { dt, ct, summ, description })
      const method = id ? db.put : db.post
      const payload = $_.set(value, schema.document[body.params.key], document)
      const { id: resId } = await method({...payload, date, lombard})
      return { id: `${resId}/${index}`}
    } catch(e) {
      console.error(e);
    }
  }
  
  const remove =  async (req, res) => {
    const remove = async (id, index) => {
      const value = await req.db.get(id)
      value.values.splice(index, 1)
      return req.db.put(value)
    }
    return Promise.all(req.body.values.map(async (v) => await remove(...v.split('/'))))
  }

  module.exports = { get, post, remove }