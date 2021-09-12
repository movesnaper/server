<template>
  <div id="app" >
    <div class="">
      <mba-header class=""></mba-header>
      <router-view class="mt-5" />
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

<style src="./style.css">

@-moz-keyframes spin { 100% { -moz-transform: rotate(360deg); } }
@-webkit-keyframes spin { 100% { -webkit-transform: rotate(360deg); } }
@keyframes spin { 100% { -webkit-transform: rotate(360deg); transform:rotate(360deg); } }

</style>
