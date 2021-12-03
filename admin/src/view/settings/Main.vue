<template>
  <b-card v-if="!loading" no-body class="lombard p-5">
    <b-tabs v-model="active" small card class="lombard-tabs">
      <b-tab v-for="({key, value}, i) in tabs" :key="i" :title="value">
        <component class="p-3" :is="`component-${key}`" :lombard="lombard" @save="save"/>
      </b-tab>
    </b-tabs>
  </b-card>
</template>

<script>

import { db } from '@/db'

export default {
  components: { 
    ComponentLombard: () => import('./Lombard'), 
    ComponentAddress: () => import('./Address'), 
    ComponentPrice: () => import('./Price') 
  },
  data() {
    return {
      active: 0,
      loading: false,
      tabs: [
        { key: 'lombard', value: 'Ломбард'}, 
        { key: 'address', value: 'Адрес'}, 
        { key: 'price', value: 'Цена'}
      ],
      lombard: {}
    }
  },
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
        const params = { key: this.$route.params.id}
        const [lombard] = await db('/lombards').get('/values', { params })
        this.lombard = lombard
      } catch(e) {
        this.$alert(e)
      } finally {
        this.loading = false
      }
    },

    async save(value) {
      try {
        await db('/lombards').post('/values', value)
      } catch(e) {
        this.$alert(e)
      }
    }    
  }

}
</script>

<style scoped>
  .lombard-tabs {
    border: 1px solid #00000029;
  }
</style>