<template>
  <b-tabs pills class="tab" vertical>
    <b-tab :title="$t(`profile.company.menu.${tab}`)" v-for="(tab, i) in tabs" :key="i">
      <component :is="`company-${tab}`" :tab="tab"/>
    </b-tab>
  </b-tabs>
</template>

<script>
import CompanyMain from './Main'
import CompanyAddress from './Address'
import CompanyBank from './bank'

export default {
  components: {
    CompanyMain,
    CompanyAddress,
    CompanyBank
  },
  data: () => ({
    tabs: ['main', 'address', 'bank']
  })
}
</script>

<style scoped>
  .tab >>> .nav-link.active{
    background-color: initial;
    color: #007bff !important;
  }
</style>