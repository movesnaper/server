<template>
  <div class="company-reestr">
    <b-tabs pills class="tab mt-3 " vertical>
      <b-tab :title="$t(`reestr.menu.${tab}`)" v-for="(tab, i) in tabs" :key="i">
        <component :is="tab"/>
      </b-tab>
    </b-tabs>
  </div>
</template>

<script>
// import mixins from '../mixins'
import Reestr from './Reestr.vue'
import Balance from './Balance.vue'

export default {
  // mixins: [mixins],
  components: {  Reestr, Balance },
  data: () => ({
    tabs: ['reestr', 'balance']
  })
}
</script>

<style scoped>
  .tab >>> .nav-link.active{
    background-color: initial;
    color: #007bff !important;
  }
  .company-reestr >>> .tabs .col-auto ul {
    background-color: white;
    position: sticky;
    top: 120px;
    z-index: 2000;
    border-bottom: none;    
  }

</style>