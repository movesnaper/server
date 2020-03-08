<template>
  <div id="app" >
    <div class="">
        <mba-header class=""></mba-header>
        <router-view class="" />
    </div>
  </div>
</template>

<script>
import MbaHeader from '@/components/Header'

export default {
  name: 'App',
  components: { MbaHeader },
  created() {
    this.$store.dispatch('update')
  }
  
}
</script>

<style>
* {
    margin: 0;
    padding: 0;
}

</style>
