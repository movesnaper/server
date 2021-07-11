<template>
  <b-tabs pills class="tab" vertical>
    <b-tab :title="$t(`profile.reports.menu.${tab}`)" v-for="(tab, i) in tabs" :key="i">
      <component :is="`report-${tab}`" :tab="tab"/>
    </b-tab>
  </b-tabs>
</template>

<script>
import ReportMain from './main/index.vue'
import ReportKassa from './Kassa'

export default {
  components: {
    ReportMain,
    ReportKassa,
  },
  data: () => ({
    tabs: ['main', 'kassa']
  })
}
</script>

<style scoped>
  .tab >>> .nav-link.active{
    background-color: initial;
    color: #007bff !important;
  }
</style>