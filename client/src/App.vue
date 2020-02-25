<template>
  <div id="app" >
    <div class="container">
        <mba-header class="row "></mba-header>
        <div class="container-fluid ">

          <router-view  class="center"/>
        </div>
    </div>
  </div>
</template>

<script>
import MbaHeader from '@/components/Header'

export default {
  name: 'App',
  components: {MbaHeader},
  created() {
    // this.$store.dispatch('update')
  }
  
}
</script>

<style>
* {
    margin: 0;
    padding: 0;
}

</style>
