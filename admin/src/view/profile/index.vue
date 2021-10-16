<template>
  <div>
    <b-card no-body class="company">
      <b-tabs v-model="active" small card class="company_tabs">
        <b-tab v-for="(item, i) in tabs" :key="i" :title="$t(`company.menu.${item}`)">
          <component :is="`profile-${item}`" :active="tabs[active]"/>
        </b-tab>
      </b-tabs>
    </b-card>


  </div>
</template>


<script>
import ProfileCompany from './company'
import ProfileProgram from './program'
import ProfileAccounts from './accounts'
import ProfileReports from './reports'
import ProfilePrice from './price/index.vue'
import ProfileReestr from './reestr/index.vue'

export default {
  components: { 
    ProfileCompany, 
    ProfileProgram, 
    ProfileAccounts,
    ProfileReports,
    ProfilePrice,
    ProfileReestr
  },
  data: () => ({
    active: 0,
    tabs: [
      'company',
      'program',
      'accounts',
      'reports',
      'price',
      'reestr'
    ]
  }),


}
</script>

<style scoped>
.company_tabs >>> a {
  color: black  !important;
}
</style>