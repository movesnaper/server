  const schema = {
    main: [
      { key: 'name', value: 'Наименование' },
      { key: 'idn', value: 'ОКПО' },
      { key: 'director', value: 'Директор' },
      { key: 'bookkeeper', value: 'Бухгалтер' },
      { key: 'phone', value: 'Телефон' }
    ],
    address: [
      { key: 'city', value: 'Горд' },
      { key: 'region', value: 'Область' },
      { key: 'district', value: 'Район' },
      { key: 'street', value: 'Улица' },
      { key: 'home', value: 'Дом' }
    ]
  }
  const get =  async ({ db, query }, res) => {
    try {
      res.status(200).json(schema[query.key])
    } catch(e) {
      console.error(e);
      res.status(500).json(e)
    }
  }

  module.exports = { get }