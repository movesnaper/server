<template>
  <report-period v-model="selected" :filters="filters" @print="print">
    <div :id="schema.key" v-if="selected.period">
      <report-header
        v-bind="schema"
        :company="company"
        :period="period.values.find((v) => v.value === selected.period)"
        class="mt-5"/>
      <div v-if="!loading" class="mt-2">
        <div class="col" style="text-align: right; font-style: italic;">{{ schema.currency }}</div>
        <report-table :headers="schema.headers" :values="values" :footer="footer"/>
        <report-sign :sign="schema.sign"/>       
      </div>
      <b-skeleton-table v-else :rows="5" :columns="4" :table-props="{ bordered: true, striped: true }"/>  
    </div>
    <div v-else class="border center flex-center grey mt-3" style="height: 40vh">
      {{ $t(`reports.periods.no_period`)}}
    </div>
  </report-period>
</template>

<script>
import { db } from '@/db'
import ReportPeriod from './components/Period.vue'
import ReportHeader from './components/Header.vue'
import ReportTable from './components/Table.vue'
import ReportSign from './components/Sign.vue'
import printJS from "print-js";

export default {
  components: { ReportPeriod, ReportHeader, ReportTable, ReportSign },
  props: ['schema', 'period'],
  data: () => ({
    footer: [],
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
        const { values, footer } = await db('/report').get(`/${this.schema.key}`, { params })
        this.values = values
        this.footer = footer
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