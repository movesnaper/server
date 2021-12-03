<template>
  <b-navbar type="dark" variant="info" class="px-5" fixed="top">
      <b-navbar-brand @click="reload" style="cursor: pointer">PShop</b-navbar-brand>
    <b-navbar-nav >
      <b-nav-item to="/" :active="$route.path === '/'">Главная</b-nav-item>
      <b-nav-item v-for="({ key, value }) in menu" :key="key" active-class="active"
       :to="`/${key}`">{{ value}}</b-nav-item>
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
    loading: false,
    menu: [
      { key: 'company', value: 'Компания'},
      { key: 'lombard', value: 'Ломбард'},
      { key: 'users', value: 'Сотрудниики'},
      { key: 'report', value: 'Отчёты'},
      { key: 'program', value: 'Программа'},
    ]
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
