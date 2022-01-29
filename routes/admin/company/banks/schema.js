const schema = {
  tabs: [
    { key: 'account', value: 'Счёт' },
    { key: 'bank', value: 'Банк' },
    { key: 'address', value: 'Адрес'}
  ],
  account: [
    { key: 'number', value: 'Номер счёта' },
    { key: 'date', value: 'Дата открытия', type: 'date' },
    { key: 'description', value: 'Описание', is: 'b-form-textarea' }
  ],
  address: [
    { key: 'city', value: 'Город' },
    { key: 'region', value: 'Область' },
    { key: 'district', value: 'Район' },
    { key: 'street', value: 'Улица' },
    { key: 'home', value: 'Дом' }
  ],
  bank: [
    { key: 'name', value: 'Наименование' },
    { key: 'idn', value: 'МФО' }
  ]
}

const get =  async (req, res) => {
  try {
    return schema
  } catch(e) {
    console.error(e);
    res.status(500).json(e)
  }
}

module.exports = { get }