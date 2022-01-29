<template>
  <div id="app" >
    <div class="">
      <header-menu/>
      <router-view class="pt-5" />
    </div>
  </div>
</template>

<script>

export default {
  name: 'App',
  components: { 
    HeaderMenu: () => import('@/components/Header') 
  }
}
</script>

<style src="./style.css">

@-moz-keyframes spin { 100% { -moz-transform: rotate(360deg); } }
@-webkit-keyframes spin { 100% { -webkit-transform: rotate(360deg); } }
@keyframes spin { 100% { -webkit-transform: rotate(360deg); transform:rotate(360deg); } }

</style>
