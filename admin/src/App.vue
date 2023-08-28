<template>
  <div id="app" >
    <div class="">
      <b-navbar type="dark" variant="info" class="px-5" fixed="top">
        <b-navbar-brand style="cursor: pointer" to="/">PShop</b-navbar-brand>
        <header-menu v-if="user" />
        <b-navbar-nav  class="ml-auto">
          <b-nav-item-dropdown v-if="user" :text="user" right>
          <b-link class="dropdown-item" @click="$router.push('/logout')">
            Выйти
          </b-link>
          </b-nav-item-dropdown>
        </b-navbar-nav>
      </b-navbar>
      <router-view class="pt-5" />
    </div>
  </div>
</template>

<script>
const { user } = require('@/db')

export default {
  name: 'App',
  components: { 
    HeaderMenu: () => import('@/components/Header') 
  },
  data: () => ({
    user: ''
  }),
  watch: {
    $route: {
      handler () {
        this.user = user.name || ''
      },
      immediate: true
    }
  }
}
</script>

<style src="./style.css">

@-moz-keyframes spin { 100% { -moz-transform: rotate(360deg); } }
@-webkit-keyframes spin { 100% { -webkit-transform: rotate(360deg); } }
@keyframes spin { 100% { -webkit-transform: rotate(360deg); transform:rotate(360deg); } }

</style>
