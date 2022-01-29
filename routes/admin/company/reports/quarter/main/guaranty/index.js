const { toNumber } = require("../../../functions")
const toThousand = (v) => Math.round(v / 1000) || '-'
const summ = (cur, { ocenca }) => cur += toNumber(ocenca)
const gold = ({ dt, zalog }) => [dt].includes('377') && [zalog].includes('gold')
const before = ({ diff }) => diff > 0 && diff <= 30
const after = ({ diff }) => diff > 30

const values = async (req, res) => {
  const credits = (await require('../credits')(req, res)).filter(gold)
    return [
      { col: 'my-3 center-text', is: 'h6', value: `6. Информация о ломе и изделиях из драгоценных
       металлов и драгоценных камней, прнятых некредитной финансовой организацией, осуществляющей
        деятельность ломбардов, в залог`},
      { col: 'mt-3 end-text', is: 'i', style: { 'font-size': '14px'}, value: 'тысяч российских рублей' },
      { row: 'grey', children: [
        { col: 'col border flex-center center-text', value: `Сумма оценки лома и изделий из драгоценных металлов и драгоценных камней,
        прнятых некредитной финансовой организацией, осуществляющей деятельность ломбардов,
         в залог по договорам займа, на конец отчётного периода` },
      ]},
      { row: 'grey', children: [
        { col: 'col-2 border flex-center center-text', value: `общая сумма` },
        { col: 'col border flex-center center-text', value: `по договорам займа, обязательства по
         которым не погашены в установленный срок и которые находятся на льготном месячном сроке` },
        { col: 'col border flex-center center-text', value: `по договорам зама, по которым истёк
         льготный месячный срок, но обязательства по ним не погашены или имущество ещё не продано` },
      ]},
      { row: 'grey', children: [
        { col: 'col-2 border center-text', is: 'strong', value: '1'},
        { col: 'col border center-text', is: 'strong', value: '2'},
        { col: 'col border center-text', is: 'strong', value: '3'},
      ]},
      {children: [
        { col: 'col-2 border flex-center center-text', value: toThousand(credits.reduce(summ, 0)) },
        { col: 'col border flex-center center-text', value: toThousand(credits.filter(before).reduce(summ, 0)) },
        { col: 'col border flex-center center-text', value: toThousand(credits.filter(after).reduce(summ, 0)) },
      ]}
  ]
}

const get = async (req, res) => {
  try {
    return values(req, res)
  } catch(e) {
    console.error(e);
    res.status(500).json({ average: e.message })
  }
}

module.exports = { get, values }