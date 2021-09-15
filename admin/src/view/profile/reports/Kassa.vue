<template>
  <month-period v-model="params" @print="print">
      <div id="printKassa"  v-if="params.month">
        <h5 class="my-3">{{ title }}</h5>
        <report-table v-if="!loading"
        class="table-striped table-sm mt-2" 
        :header="header" :values="values"/>
        <b-skeleton-table v-else :rows="5" :columns="4" :table-props="{ bordered: true, striped: true }"/>  
      </div>
  </month-period>
</template>

<script>
import { db } from '@/db'
import MonthPeriod from './components/Period.vue'
import ReportTable from './components/Table.vue'
import printJS from "print-js";
export default {
  components: { MonthPeriod, ReportTable },
  data: () => ({
    title: '',
    header: [],
    values: [],
    params: {},
    loading: true
  }),
  watch: {
    params(params) {
      if (params.month) this.refresh(params)
    }
  },
  methods: {
    async print() {
      printJS({
        printable: "printKassa",
        type: "html",
        css: [
        'https://maxcdn.bootstrapcdn.com/bootstrap/4.0.0/css/bootstrap.min.css',
        './custom.css'
        ],
        scanStyles: false
      });
    },
    async refresh(params) {
      if(!params.month) return
      try {
        this.loading = true
        const { title, header, values } = await db('/report').get(`/kassa`, { params })
        this.title = title
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

<style >

</style>