const { moment } = require('./functions')
const credits = ({ dt }) => [dt].includes('377')
const gold = ({ zalog }) => [zalog].includes('gold')
const transport = ({ zalog }) => [zalog].includes('transport')
const things = ({ zalog }) => [zalog].includes('things')
const other = ({ zalog }) => !['gold', 'transport', 'things'].includes(zalog)
const between = (start, end) => (date) => moment(date).isBetween(moment(start), moment(end))
module.exports = {
  credits,
  gold,
  transport,
  things,
  other,
  between
}