<template>
  <preloader v-if="loading"/>
  <div v-else class="report">
    <node v-for="(node, i) in schema" :key="i" :node="node"
    @refresh="refresh"/>
  </div>
</template>

<script>
import Node from './Node.vue'
import { db } from '@/db'
import Preloader from './components/Skeleton.vue'

export default {
  name: 'Report',
  components: { Node, Preloader },
  provide() {
    return { ui: this }
  },
  data: () => ({
    schema: [],
    loading: false
  }),
  watch: {
    '$route'({ path }, old = {}) {
      if(path !== old.path) this.refresh()
    }
  },
  created() {
    this.refresh()
  },
  methods: {
    async refresh() {
      this.loading = true
      const { key, period = '' } = this.$route.params
      const url = key && `/${key}/${period}`
      try {
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