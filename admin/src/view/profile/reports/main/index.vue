<template>
  <div>
    <div class="row m-0">
      <quorter-range  class="col"
      v-model="period" :range="quarters" :year="year"/>
      <b-button :disabled="!period"  variant="primary" @click="print('printMe')">
        {{$t('btn.print')}}
      </b-button>
    </div>
    <report-header class="print mt-4" :title="title"/>
    <div v-if="period">
      <b-card v-if="!loading" no-body class="company">
        <b-tabs v-model="active" small card class="company_tabs">
          <b-tab v-for="(item, i) in tabs" :key="i" :title="$t(`reports.company.menu.${item}`)">
            <component class="print p-3" :is="item" 
            :company="company"
            :period="quarterRange"
          />
          </b-tab>
        </b-tabs>
      </b-card>
      <div v-else>
        <b-skeleton-table 
        :rows="5"
        :columns="4"
        :table-props="{ bordered: true, striped: true }"
        ></b-skeleton-table>
      </div>
    </div>
    <div v-else class="border center flex-center grey" style="height: 40vh">
      Пожалуйста, выберите переод отчёта...
    </div>
  </div>
</template>

<script>
import { db } from '@/db'
import components from './index'
import QuorterRange from '../../../reports/QuorterRange.vue'
import { moment } from '@/functions'
const format = 'YYYY-MM-DD'

export default {
  components: {...components, QuorterRange },
  data: () => ({
    loading: false,
    active: 0,
    tabs: [
      'common-info',
      'common-results',
      'average-values',
      'money-operations',
      'balance-info',
      'gold-guaranty'
    ],
    period: null,
    company: {}
  }),
  watch: {
    period() {
      this.refresh()
    }
  },
  computed: {
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
    title({ period, year }) {
      return `${period} квартал ${year.format('YYYY')} г.`
    },
    quarterRange({ year, period }) {
      const quarter = year.quarter(period)
      const start = quarter.clone().startOf('quarter')
      const end = quarter.clone().endOf('quarter')
      return { 
        start: start.format(format),
        end: end.format(format)
      }
    },
    yearRange({ year, quarterRange }) {
      const start = year.clone().startOf('year')
      return { 
        start: start.format(format),
        end: quarterRange.end
      }
    },
  },
  methods: {
    print(v) {
      console.log(v);
    },
    async refresh() {
      this.loading = true
      try {
        // const start = await db('/report').get(`/results`, { 
        //   params: this.quarterRange
        // })
        // const end = await db('/report').get(`/results`, { 
        //   params: this.yearRange
        // })
        this.company = await db('/company').get('/') || {}
      } catch({ message }) {
        this.$alert({ message, title: 'report-company'})
      } finally {
        this.loading = false
      }
    }
  }
}
</script>

<style scoped>
.company_tabs >>> a {
  color: black  !important;
}
</style>