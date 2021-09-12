<template>
  <month-period v-model="params" @print="print">
      <div id="printPenalty" v-if="params.month">
        <header-table :value="title" class="mt-5"/>
        <div v-if="currency" class="col" style="text-align: right; font-style: italic;">{{ currency }}</div>
        <report-table v-if="!loading"
        class="mt-2" 
        :header="header" 
        :values="values"/>
        <b-skeleton-table v-else :rows="5" :columns="4" :table-props="{ bordered: true, striped: true }"/>  
        </div>
  </month-period>
</template>

<script>
import { db } from '@/db'
import MonthPeriod from './components/MonthPeriod.vue'
import ReportTable from './components/ReportTable.vue'
import HeaderTable from './components/HeaderTable.vue'
export default {
  components: { MonthPeriod, ReportTable, HeaderTable },
  data: () => ({
    title: {},
    header: [],
    values: [],
    params: {},
    currency: '',
    loading: true
  }),
  watch: {
    params(params) {
      if (params.month) this.refresh(params)
    }
  },
  methods: {
    async print() {
      await this.$htmlToPaper('printPenalty');
    },
    async refresh(params) {
      if(!params.month) return
      try {
        this.loading = true
        const { title, header, values, currency } = await db('/report').get(`/penalty`, { params })
        this.title = title
        this.header = header
        this.values = values
        this.currency = currency
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