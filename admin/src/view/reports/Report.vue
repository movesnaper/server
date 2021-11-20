<template>
    <preloader v-if="loading"/>
    <div v-else class="report">
      <node v-for="(node, i) in schema" :key="i" :node="node" :ui="ui"/>
    </div>
</template>

<script>
import Node from './Node.vue'
import { db } from '@/db'
import Preloader from './components/Skeleton.vue'
export default {
  name: 'Report',
  components: { Node, Preloader },
  data: () => ({
    schema: [],
    loading: false,
  }),
  watch: {
    '$route': {
      async handler(v, old = {}) {
        const report = JSON.parse(localStorage.getItem('report', '{}'))
        if(report) this.$router.push({ query: { ...report[v.path], ...v.query}})
        if(v.path !== old.path) this.refresh()
      },
      immediate: true
    }
  },


  computed: {
    ui() {
      return this
    }
  },
  methods: {
    async refresh() {
      const { key, period = '' } = this.$route.params
      const url = key && `/${key}/${period}`
      try {
        this.loading = true
        this.schema = url && await db('/report').get(url, { params: this.$route.query })
      } catch(e) {
        console.error(e)
      } finally {
        this.loading = false
      }
    }
  }
}
</script>

<style>

</style>