import { mapGetters } from 'vuex'
import MonthRange from './MonthRange'
import { summ, mult, moment } from '@/functions'

export default {
    components: { MonthRange },
      props: { value: Object },
      data() {
        return {
          month: moment().month() + 1,
          zoom: 90
        }
      },
      computed: {
          ...mapGetters({
              allReestr: 'reestr',
              company: 'company',
              klientsMap: 'klientsMap',
              lombardsMap: 'lombardsMap',
          }),
          route() {
            return this.$route.params.id
          },
          reestr({ allReestr, route }) {
            return allReestr.filter(({ lombard }) => lombard === route)
          },
          date({  }) {
              return moment()
          },
          year({ date }) {
              return moment(date.year(), 'YYYY')
          },
          months({ year }) {
              const range = year.range('year')
              return [ ...range.by('months')].map(v => v.format('MMMM'))
          },
          values({ reestr }) {      
          return  reestr.filter(({ values }) => values && values.map)
              .reduce((arr, { values, _id, date }) => {
                  const items = values.map(v => ({ ...v, _id, date }))
                  return [ ...arr, ...items ]
              }, [])
          },
          accaunts() {
              return ['377', '703', '704']
          },
          monthRange({ year, month }) {
            return year.month(month - 1).range('month')
          },
          days({ monthRange }) {          
              return [ ...monthRange.by('days')]
          },
          ok({ isBefore, monthRange }) {
            const { start } = monthRange
              return this.getOk(isBefore(start))
          },
          dt301({ values }) {
              return values.filter(({ dt }) => dt === '301')
          },
          ct301({ values }) {
              return values.filter(({ ct }) => ct === '301')
          }
      },
      methods: {
          format(date) {
              return date ? moment(date).format('L') : ''
          },
          same(date) {
              return v => moment(v.date).isSame(date, 'day')
          },
          isBefore(date) {
              return v => moment(v.date).isBefore(date, 'day')
          },
          isSameOrBefore(date) {
              return v => moment(v.date).isSameOrBefore(date, 'day')
          },
          monthFilter({ date }) {
              const { start, end } = this.monthRange
              return moment(date).isBetween(start, end, 'day', '[]')
          },
          prixod(filter) {
              const values = this.dt301.filter(filter)
                .filter(({ ct }) => !this.accaunts.includes(ct))
              return summ( ...values.map(v => v.summ))
          },
          rasxod(filter) {
              const values = this.ct301.filter(filter)
                .filter(({ dt }) => !this.accaunts.includes(dt))
              return summ( ...values.map(v => v.summ))
          },
          dt(acc, filter) {
              const values = this.values.filter(({ dt }) => dt === acc)
              return summ( ...values.filter(filter).map(v => v.summ))
          },
          ct(acc, filter) {
              const values = this.values.filter(({ ct }) => ct === acc)
              return summ( ...values.filter(filter).map(v => v.summ))
          },
          totalDt(filter) {
              const values = this.dt301.filter(filter)
              return summ( ...values.map(v => v.summ))
          },
          totalCt(filter) {
              const values = this.ct301.filter(filter)
              return summ( ...values.map(v => v.summ))
          },
          getOk(filter) {
              const ok = 1000
              const dt = this.totalDt(filter)
              const ct = mult(this.totalCt(filter), -1)
              return summ(ok, dt, ct)
          },
          t(v) {
              // return this.$t('zvit.' + v)
              return v
          },
          fio(v){
            const { family, name, sername } = {...v }
            return v ? `${family} ${name.charAt(0)}. ${sername.charAt(0)}.` : ''
          },
          print(id) {
            this.$htmlToPaper(id);
          }
      }
  
  }