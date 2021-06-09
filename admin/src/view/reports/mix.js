import { mapGetters } from 'vuex'
import MonthRange from './MonthRange'
import QuorterRange from './QuorterRange'
import { moment } from '@/functions'
import Sign from './Sign'
export default {
    components: { QuorterRange, MonthRange, Sign },
      props: { value: Object },
      data() {
        return {
          month: moment().month() + 1,
          quarter: moment().quarter() + '',
          zoom: 90,
        }
      },
      watch: {
        month(v) {
          this.refresh()
        }
      },
      computed: {
        ...mapGetters({
            allReestr: 'reestr',
            company: 'company',
            klientsMap: 'klientsMap',
            lombardsMap: 'lombard/map',
        }),
        logo({ route, lombardsMap }) {
            return (lombardsMap[route] || {}).logo
        },
        route() {
            return this.$route.params.id
        },
        lombard({ route, lombardsMap }) {
        return {...lombardsMap[route]}
        },
        finCod({ lombard }) {
            return lombard.kod
        },
        reestr({ allReestr, route }) {
        return allReestr
            .filter(({ lombard }) => lombard === route)
                .filter(({ deleted }) => !deleted)
        },
        used({ reestr }) {
        return reestr.filter(v => v.ref)
            .reduce((cur, v) => {
                return {...cur, [v.ref]: v }
            }, {})
        },
        date({  }) {
            return moment()
        },
        year({ date }) {
            return moment(date.year(), 'YYYY')
        },
        quarters({ year }) {
            const range = year.range('year')
            return [ ...range.by('quarters')]
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
        accounts({ lombard }) {
            const reduce = key => ({...lombard.accounts}[key] || [])
                .reduce((cur, v) => ({...cur, [v.acc]: v }), {})
            return { dt: reduce('dt'), ct: reduce('ct') }
    },
        monthRange({ year, month }) {
            return year.month(month - 1).range('month')
        },
        days({ monthRange }) {          
            return [ ...monthRange.by('days')]
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
            const format = 'DD.MM.YYYY'
              return (v) => {
                return moment(v.date, format).isSameOrBefore(moment(date, format), 'day')
              }
          },
          monthFilter({ date }) {
              const { start, end } = this.monthRange
              return moment(date).isBetween(start, end, 'day', '[]')
          },
          prixod(filter) {
            //   const values = this.dt301.filter(filter)
            //     .filter(({ ct }) => !accounts.includes(ct))
              return 0
            //   summ( ...values.map(v => v.summ))
          },
          rasxod(filter) {
            //   const values = this.ct301.filter(filter)
            //     .filter(({ dt }) => !accounts.includes(dt))
              return 0
            //   summ( ...values.map(v => v.summ))
          },
          dt(acc, filter) {
            //   const values = this.values.filter(({ dt }) => dt === acc)
              return 0
            //   summ( ...values.filter(filter).map(v => v.summ))
          },
          ct(acc, filter) {
            //   const values = this.values.filter(({ ct }) => ct === acc)
              return 0
            //   summ( ...values.filter(filter).map(v => v.summ))
          },
          totalDt(filter) {
            //   const values = this.dt301.filter(filter)
              return 0
            //   summ( ...values.map(v => v.summ))
          },
          totalCt(filter) {
            //   const values = this.ct301.filter(filter)
              return 0
            //   summ( ...values.map(v => v.summ))
          },
          getOk(filter) {
            //   const ok = {...this.accounts.dt['301']}.summ
            //   const dt = this.totalDt(filter)
            //   const ct = mult(this.totalCt(filter), -1)
              return 0
            //   summ(ok, dt, ct)
          },
          t(v) {
              return this.$t('zvit.' + v)
          },
          fio(v){
            if (!v) return ''
            const { family, name, sername } = v || {}
            return `${family} ${name.charAt(0)}. ${sername.charAt(0)}.`
          },
          print(id) {
            this.$htmlToPaper(id);
          }

      }
  
  }