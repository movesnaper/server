module.exports = (values) => {
  const total = (key) => values.reduce((cur, v) => cur += v[key], 0)
  return {
    date: 'Итого',
    prixod: total('prixod'),
    ct377: total('ct377'),
    ct703: total('ct703'),
    ct704: total('ct704'),
    totalDt: total('totalDt'),
    dt377: total('dt377'),
    dt703: total('dt703'),
    rasxod: total('rasxod'),
    totalCt: total('totalCt'),
    ok: ''
  }
  // return [
  //   { text: 'Итого', type: 'string' },
  //   { text: total('prixod') },
  //   { text: total('ct377') },
  //   { text: total('ct703') },
  //   { text: total('ct704') },
  //   { text: total('totalDt') },
  //   { text: total('dt377') },
  //   { text: total('dt703') },
  //   { text: total('rasxod') },
  //   { text: total('totalCt') },
  //   { text: '', type: 'string' }
  // ].map((v) => ({...v, is: 'th', type: v.type || 'double' }))
}