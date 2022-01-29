<template>
  <preloader v-if="loading"/>
  <div v-else class="col">
    <print-btn>
      <template #default="{ print }">
        <report-table ref="report-table" :node="schema" :url="url" :print-mode="print">
          <template #cell="{ item, header, value }">
            <div @click="() => show(item, header, value)">{{ item.value }}</div>
          </template>
          <template #footer="{ item, header }">
            <b-button v-if="header.key === 'account'"  variant="outline-success" 
              @click="() => show({ is: 'account-value'})">
              <b-icon icon="plus-circle"/>
            </b-button>
            <div v-else-if="item">{{ item.value }}</div>
          </template>
        </report-table>
      </template>
    </print-btn>
  </div>
</template>

<script>
import { db } from '@/db'

export default {
  components: {
    PrintBtn: () => import('../reports/components/Print.vue'),
    ReportTable: () => import('../reports/components/Table.vue'),
    Preloader: () => import('../reports/components/Skeleton.vue'),
  },
  data: () => ({
    url: '/company/balance',
    schema: {
      attrs: {
        hovered: 'cell',
        headers: []
      }
    },
    loading: false,
  }),

  watch: {
    '$route': {
      async handler ({ query }) {
        const reports = JSON.parse(localStorage.getItem('reports', '{}'))
        if (reports) this.$router.push({ query: { ...reports[this.url], ...query } })
        this.refresh()
      },
      immediate: true
    }
  },

  methods: {

    async show ({ attrs = {}, is }, header, value) {
      const { default: component } = await import('./components/' + is)
      const params = { header, value, params: attrs.params }
      await this.$modal.show(component, params, { height: 'auto', width: '80%' })
      this.$refs['report-table'].refresh(true)
    },

    async refresh () {
      try {
        const params = { key: 'table-headers' }
        this.schema.attrs.headers = await db(this.url).get('/schema', { params })
      } catch (e) {
        this.$alert(e)
      }
    }
  }
}
</script>

<style>

</style>
