<template>
  <div id="section-to-print" class="col">
    <input type="button" @click="print()" value="print">
    <month-range   class="no-print mb-2" v-model="month" :range="months" :year="year"/>    
    <table  class="kassa table table-striped table-sm">
    <thead>
        <tr>
        <th scope="col">{{ t('date') }}</th>
        <th scope="col">{{ t('prixod') }}</th>
        <th scope="col">{{ t('ssuda') }}</th>
        <th scope="col">{{ t('procent') }}</th>
        <th scope="col">{{ t('penalty') }}</th>
        <th scope="col">{{ t('totalDt') }}</th>
        <th scope="col">{{ t('rasxod') }}</th>
        <th scope="col">{{ t('ssuda') }}</th>
        <th scope="col">{{ t('procent') }}</th>
        <th scope="col">{{ t('penalty') }}</th>
        <th scope="col">{{ t('totalCt') }}</th>
        <th scope="col">{{ ok }}</th>
        </tr>
    </thead>
    <tbody>
        <tr v-for="(date, index) in days" :key="index">
            <th scope="row">{{ format(date) }}</th>
            <td>{{ prixod(same(date)) }}</td>
            <td>{{ ct('377', same(date)) }}</td>
            <td>{{ ct('703', same(date)) }}</td>
            <td>{{ ct('704', same(date)) }}</td>
            <th>{{ totalDt(same(date)) }}</th>
            <td>{{ rasxod(same(date)) }}</td>
            <td>{{ dt('377', same(date)) }}</td>
            <td>{{ dt('703', same(date)) }}</td>
            <td>{{ dt('704', same(date)) }}</td>
            <th>{{ totalCt(same(date)) }}</th>
            <th>{{ getOk(isSameOrBefore(date)) }}</th>
        </tr>
        <tr>
            <th scope="row"></th>
            <td>{{ prixod(monthFilter) }}</td>
            <td>{{ ct('377', monthFilter) }}</td>
            <td>{{ ct('703', monthFilter) }}</td>
            <td>{{ ct('704', monthFilter) }}</td>
            <th>{{ totalDt(monthFilter) }}</th>
            <td>{{ rasxod(monthFilter) }}</td>
            <td>{{ dt('377', monthFilter) }}</td>
            <td>{{ dt('703', monthFilter) }}</td>
            <td>{{ dt('704', monthFilter) }}</td>
            <th>{{ totalCt(monthFilter) }}</th>
            <th></th>
        </tr>
    </tbody>
    </table>
  </div>
</template>

<script>
import { mapGetters } from 'vuex'
import MonthRange from './MonthRange'
import { summ, mult, moment } from '@/functions'
export default {
  components: { MonthRange },
    props: { value: Object },
    data() {
      return {
        month: moment().month() + 1
      }
    },
    computed: {
        ...mapGetters({
            reestr: 'reestr',
            company: 'company',
        }),
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
            return moment(date).format('L')
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
            return summ( ...values.map(v => {
              console.log(v)
              
              return v.summ
            }))
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
        print() {
          window.print()
        }
    }

}
</script>

<style>
@media print {
  @page {
    size: landscape
  }
  body * {
    visibility: hidden;
  }

  #section-to-print, #section-to-print * {
    visibility: visible;
    /* color: white; */
    /* font-size: 5rem; */
  }
  #section-to-print {
    position: absolute;
    left: 0;
    top: 0;
    margin: 0;
    padding: 0;
    
  }
}

.kassa.table {
    width: 1000px;
    overflow: hidden;
}
/* .table td.fit, 
.table th.fit {
    white-space: nowrap;
    width: 1%;
} */
.fixed_header{
    /* width: 400px; */
    /* table-layout: fixed;
    border-collapse: collapse; */
}

.fixed_header tbody{
  display:block;
  width: 100%;
  overflow: auto;
  /* overflow-y: scroll; */
  /* height: 600px; */
}

.fixed_header thead tr {
   display: block;
}

.fixed_header thead {
  /* background: black;
  color:#fff; */
}

.fixed_header th, .fixed_header td {
  /* padding: 5px;
  text-align: left;
  width: 200px; */
}
</style>