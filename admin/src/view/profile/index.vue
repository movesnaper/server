<template>
  <div class="p-5">
    <b-card v-if="!loading" no-body class="company">
      <b-tabs v-model="active" small card class="company_tabs">
        <b-tab v-for="(item, i) in tabs" :key="i" :title="$t(`company.menu.${item}`)">
          <component class="p-3" :is="item"/>
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
import Program from './Program'
import Settings from './Settings'

export default {
  components: { Company, Program, Settings },
  data: () => ({
    loading: false,
    active: 0,
    tabs: ['company', 'program', 'settings']
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