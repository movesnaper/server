<template>
  <b-navbar type="dark" variant="info">
      <b-navbar-brand @click="reload" style="cursor: pointer">PShop</b-navbar-brand>
    <b-navbar-nav >
      <b-nav-item to="/" exact exact-active-class="active">Главнвя</b-nav-item>
      <b-nav-item v-if="user" to="/profile" exact exact-active-class="active">Компания</b-nav-item>
      <b-nav-item v-if="user" to="/lombards" active-class="active">Ломбард</b-nav-item>
      <b-nav-item v-if="user" to="/users" exact exact-active-class="active">Сотрудниики</b-nav-item>
    </b-navbar-nav>
    <b-navbar-nav  class="ml-auto">
      <b-nav-item-dropdown v-if="user" :text="user" right>
      <b-link class="dropdown-item" :disabled="loading" @click="onLogout">
        <b-spinner v-if="loading" class="absolute-center"/>
        {{ $t('auth.logout') }}
      </b-link>
      </b-nav-item-dropdown>
      <b-nav-item v-else to="/login" exact exact-active-class="active">{{ $t('auth.login') }}</b-nav-item>
    </b-navbar-nav>
  </b-navbar>

</template>

<script>
import {mapGetters, mapActions} from 'vuex'

export default {
  data: () => ({
    loading: false
  }),
  computed: {
    ...mapGetters(['user'])
  },
  methods: {
    ...mapActions(['logout']),
    reload() {
      window.location.reload()
    },
    onLogout() {
      this.loading = true
      this.logout()
    }
  }
}
</script>

<style>

</style>
