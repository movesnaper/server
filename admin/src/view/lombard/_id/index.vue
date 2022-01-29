<template>
  <div class="m-5">
    <b-card v-if="!loading" no-body class="lombard">
      <b-tabs v-model="active" small card class="lombard-tabs">
        <b-tab v-for="({key, value}) in schema" :key="key" :title="value">
          <lombard v-model="lombard" :field-key="key" @change="saveSync"/>
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
    Lombard: () => import('./Lombard')
  },
  data () {
    return {
      active: 0,
      loading: false,
      lombard: {},
      schema: [],
      saveSync: debounce(this.save, 3000)
    }
  },
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
      this.schema = await db('/company').get('/lombards/schema', { params })
    } catch (e) {
      this.$alert(e)
    }
  },
  methods: {
    async refresh () {
      try {
        this.loading = true
        const params = { _id: this.$route.params.id }
        this.lombard = await db('/company').get('/lombards', { params })
      } catch (e) {
        this.$alert(e)
      } finally {
        this.loading = false
      }
    },

    async save () {
      try {
        const { id } = await db('/company').post('/lombards', this.lombard)
        this.lombard = {...this.lombard, _id: id }
      } catch (e) {
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
