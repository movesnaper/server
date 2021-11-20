<template>
  <program-versions></program-versions>
</template>

<script>
import ProgramVersions from './Versions.vue'
// import ProgramSettings from './Settings.vue'

export default {
  components: { ProgramVersions },
}
</script>

<style scoped>
  .tab >>> .nav-link.active{
    background-color: initial;
    color: #007bff !important;
  }
</style>