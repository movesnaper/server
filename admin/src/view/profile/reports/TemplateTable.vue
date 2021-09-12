<template>
  <month-period v-model="selected" :filters="filters" @print="print">
      <div :id="schema.key" v-if="selected.period">
        <header-table 
          v-bind="schema"
          :company="company"
          :period="period.values.find((v) => v.value === selected.period)"
          class="mt-5"/>
        <div class="col" style="text-align: right; font-style: italic;">{{ schema.currency }}</div>
        <report-table v-if="!loading"
        class="mt-2" 
        :header="header" 
        :values="values"/>
        <b-skeleton-table v-else :rows="5" :columns="4" :table-props="{ bordered: true, striped: true }"/>  
      </div>
      <div v-else class="border center flex-center grey mt-3" style="height: 40vh">
        {{ $t(`reports.periods.no_period`)}}
      </div>
  </month-period>
</template>

<script>
import { db } from '@/db'
import MonthPeriod from './components/MonthPeriod.vue'
import ReportTable from './components/ReportTable.vue'
import HeaderTable from './components/HeaderTable.vue'
import printJS from "print-js";

export default {
  components: { MonthPeriod, ReportTable, HeaderTable },
  props: ['schema', 'period'],
  data: () => ({
    header: [],
    values: [],
    selected: {},
    loading: false
  }),
  watch: {
    selected(v) {
      if (v.period) this.refresh(v)
    }
  },
  computed: {
    filters() {
      return [this.period, this.schema.lombard].filter((v) => v)
    },
    company() {
      const lombard = this.schema.lombard.values
        .find((v) => v.value === this.selected.lombard)
      return {...this.schema.company, ...lombard }
    }
  },
  methods: {
    async print() {
      printJS({
        printable: this.schema.key,
        type: "html",
        css: [
        'https://maxcdn.bootstrapcdn.com/bootstrap/4.0.0/css/bootstrap.min.css',
        './custom.css'
        ],
        scanStyles: false
      });
    },
    async refresh(params) {
      try {
        this.loading = true
        const { header, values } = await db('/report').get(`/${this.schema.key}`, { params })
        this.header = header
        this.values = values
      } catch(e) {
        console.error(e)
      } finally {
        this.loading = false
      }
    }
  }
}
</script>

<style scoped>

</style>