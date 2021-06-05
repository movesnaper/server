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
.flex-between {
  display: flex;
  justify-content: space-between;
}
.flex-end {
  display: flex;
  justify-content: flex-end;
}
.center {
  display: flex;
  justify-content: center;
}
.absolute-center {
  margin: auto;
  position: absolute;
  top: 0; left: 0; bottom: 0; right: 0;
}
.relative {
  position: relative;
}

</style>
