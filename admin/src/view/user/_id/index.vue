<template>
  <div class="p-5">
    <b-card v-if="!loading" no-body class="user p-5">
      <b-tabs v-model="active" small card class="user-tabs">
        <b-tab v-for="({key, value}) in schema" :key="key" :title="value">
          <user v-model="user" :field-key="key" @change="saveSync"/>
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
    User: () => import('../_id/User.vue')
  },
  data () {
    return {
      active: 0,
      loading: false,
      user: {},
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
      this.schema = await db('/company').get('/users/schema', { params })
    } catch (e) {
      this.$alert(e)
    }
  },
  methods: {
    async refresh() {
      try {
        this.loading = true
        const params = { _id: this.$route.params.id }
        this.user = await db('/company').get('/users', { params })
      } catch (e) {
        this.$alert(e)
      } finally {
        this.loading = false
      }
    },
    
    async save() {
      try {
        const { id } = await db('/company').post('/users', this.user)
        this.user = {...this.user, _id: id }
      } catch (e) {
        this.$alert(e)
      }
    }
  }

}
</script>

<style scoped>
  .user-tabs {
    border: 1px solid #00000029;
  }
</style>
