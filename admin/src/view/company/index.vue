<template>
  <div>
    <b-navbar class="px-5" >
      <b-navbar-nav >
        <b-nav-item v-for="({ title, to }, i) in tabs" :key="i"
        :to="to"
        >
          {{ title }}
        </b-nav-item>
      </b-navbar-nav>
    </b-navbar>
    <router-view />
  </div>
</template>


<script>


export default {

  data: () => ({
    active: 0,
    tabs: [
      { to: '/company', title: 'Компания'},
      { to: '/company/program', title: 'Программа' },
      { to: '/company/accounts', title: 'План счетов' },
      { to: '/company/price', title: 'Цена' },
      { to: '/company/reestr', title: 'Реестр' }
    ]
  }),


}
</script>

<style scoped>
.company_tabs >>> a {
  color: black  !important;
}
</style>