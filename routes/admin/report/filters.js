const credits = ({ dt }) => [dt].includes('377')
const gold = ({ zalog }) => [zalog].includes('gold')
const transport = ({ zalog }) => [zalog].includes('transport')
const things = ({ zalog }) => [zalog].includes('things')
const other = ({ zalog }) => !['gold', 'transport', 'things'].includes(zalog)

module.exports = {
  credits,
  gold,
  transport,
  things,
  other
}