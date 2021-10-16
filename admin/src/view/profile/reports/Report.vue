<template>
  <div class="p-3">
    <node v-for="(node, i) in values" :key="i"
      :value="params"
      @input="refresh"
      :loading="loading"
      :node="node"/>
  </div>
</template>

<script>
import { db } from '@/db'
import Node from './Node.vue'

export default {
  components: { Node },
  props: ['schema'],
  provide() {
    return { schema: this.schema }
  },
  data: () => ({
    loading: false,
    params: {},
    values: []
  }),
  created() {
    this.refresh({})
  },
  methods: {
    async refresh(params) {
      this.params = params
      this.loading = true
      try {
        const url = `/${this.schema.key}`
        const values = await db('/report').get(url, { params })
        this.values = values.filter((v) => v)
      } catch(e) {
        console.error(e)
      } finally {
        this.loading = false
      }
    }
  }
}
</script>

<style scoped>
.report_tabs >>> a {
  color: black  !important;
}
</style>