<template>
  <b-card no-body class="company p-5">
    <b-tabs v-model="active" small card class="company-tabs">
      <b-tab v-for="({ key, value}, i) in tabs" :key="i" :title="value">
        <component class="p-3" :is="`component-${key}`" :company="company" @save="save"/>
      </b-tab>
    </b-tabs>
  </b-card>
</template>


<script>

import { db } from '@/db'

export default {
  components: { 
    ComponentCompany: () => import('./company/Main'), 
    ComponentAddress: () => import('./company/Address'), 
    ComponentBank: () => import('./company/bank') 
  },  
  data: () => ({
    active: 0,
    tabs: [
      { key: 'company', value: 'Компания'},
      { key: 'address', value: 'Адрес' },
      { key: 'bank', value: 'Банк' }
    ],
    company: {}
  }),
  watch: {
    '$route.params': {
      handler() {
        this.refresh()
      },
      immediate: true
    }
  },
  methods: {
    async refresh() {
      try {
        this.loading = true
        this.company = await db('/company').get('/values')
      } catch(e) {
        this.$alert(e)
      } finally {
        this.loading = false
      }
    },
    async save(value) {
      try {
        await db('/company').post('/values', value)
      } catch(e) {
        this.$alert(e)
      }
    }    
  }  

}
</script>

<style scoped>
  .company-tabs {
    border: 1px solid #00000029;
  }
</style>