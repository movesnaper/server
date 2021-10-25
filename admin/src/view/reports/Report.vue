<template>
  <preloader v-if="loading && loading.report"/>
  <div v-else class="report">
    <node v-for="(node, i) in values" :key="i" :loading="loading" :node="node"/>
  </div>
</template>

<script>
import Node from './Node.vue'
import { db } from '@/db'
import Preloader from './components/Skeleton.vue'
import { debounce } from 'vue-debounce';
export default {
  name: 'Report',
  components: { Node, Preloader },
  data: (vm) => ({
    values: [],
    loading: false,
    refreshSync: debounce(vm.refresh, 1000)
  }),
  watch: {
    '$route': {
      handler() {
        this.loading = { report: true }
        this.refreshSync()
      },
      immediate: true
    },
    '$route.query': {
      handler(query) {
      if (Object.keys(query).length)
        this.loading = { values: true }
      },
      immediate: true
    }
  },
  methods: {
    async refresh() {
      const { key, period = '' } = this.$route.params
      const url = key && `/${key}/${period}`
      try {
        const values = url && await db('/report').get(url, { params: this.$route.query })
        this.values = values && values.filter((v) => v)
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