<template>
  <div class="m-5">
    <b-card v-if="!loading" no-body class="company">
      <b-tabs v-model="active" small card class="company-tabs">
        <b-tab v-for="({ key, value, is = 'company'}, i) in schema" :key="i" :title="value">
          <component :is="is" v-model="company" :field-key="key" @change="saveSync"/>
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

import { db } from '@/db'
import { debounce } from 'vue-debounce'

export default {
  components: {
    Company: () => import('./Company.vue'),
    Bank: () => import('./bank')
  },
  data: (vm) => ({
    active: 0,
    loading: false,
    company: {},
    schema: [],
    saveSync: debounce(vm.save, 3000)
  }),
  watch: {
    '$route.params': {
      handler () {
        this.refresh()
      },
      immediate: true
    }
  },
  async created () {
    try {
      const params = { key: 'tabs' }
      this.schema = await db('/company').get('/schema', { params })
    } catch (e) {
      this.$alert(e)
    }
  },
  methods: {
    async refresh () {
      try {
        this.loading = true
        this.company = await db('/company').get('/values')
      } catch (e) {
        this.$alert(e)
      } finally {
        this.loading = false
      }
    },

    async save() {
      try {
        const { id } = await db('/company').post('/values', this.company)
        this.company = {...this.company, _id: id }
      } catch (e) {
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
