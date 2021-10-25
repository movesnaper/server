<template>
  <b-tabs pills class="tab" vertical>
    <b-tab :title="$t(`program.menu.${tab}`)" v-for="(tab, i) in tabs" :key="i">
      <component :is="`program-${tab}`" :tab="tab"/>
    </b-tab>
  </b-tabs>
</template>

<script>
import ProgramVersions from './Versions.vue'
import ProgramSettings from './Settings.vue'

export default {
  components: { ProgramVersions, ProgramSettings },
  data: () => ({
    tabs: ['versions', 'settings']
  })
}
</script>

<style scoped>
  .tab >>> .nav-link.active{
    background-color: initial;
    color: #007bff !important;
  }
</style>