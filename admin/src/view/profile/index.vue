<template>
  <div class="p-5">
    <b-card v-if="!loading" no-body class="company">
      <b-tabs v-model="active" small card class="company_tabs">
        <b-tab v-for="({ title, is }, i) in tabs" :key="i" :title="title">
          <component class="p-3" :is="is"/>
        </b-tab>
      </b-tabs>
    </b-card>
    <div v-else>
      <b-skeleton-table 
      :rows="5"
      :columns="4"
      :table-props="{ bordered: true, striped: true }"
      ></b-skeleton-table>
    </div>    
  </div>
</template>

<script>
import Company from './Company'
import Ui from './Ui'
import Program from './Program'
import Settings from './Settings'

export default {
  components: { Company, Ui, Program, Settings },
  data: () => ({
    loading: false,
    active: 0,
    tabs: [
      { title: 'Company', is: 'company'},
      { title: 'Ui', is: 'ui'},
      { title: 'Program', is: 'program'},
      { title: 'Settings', is: 'settings'},
    ]
  }),
  async created() {
    this.loading = true
    await this.$store.dispatch('updateCompany')
    this.loading = false
  }
}
</script>

<style scoped>
.company_tabs >>> a {
  color: black  !important;
}
</style>