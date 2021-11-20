<template>
  <b-tabs small card :class="['report-tabs']"
  :value="attrs.values.findIndex((v) => v.key === query.tab)" 
  @input="setValue">
    <b-tab v-for="({ key, title }) in attrs.values" :key="key" :title="title">
      <skeleton v-if="loading"/>
      <node v-else v-for="(node, i) in values" :key="i" :node="node"/>
    </b-tab>
  </b-tabs>
</template>

<script>
import { db } from '@/db'

export default {
  props: ['node'],
  components: {
    Skeleton: () => import('./Skeleton.vue'),
    Node: () => import('../Node.vue')
  },
  data: () => ({
    loading: false,
    values: []
  }),
  watch: {
    '$route.query': {
      handler(v) {
      const {path} = this.$route
      const value = JSON.parse(localStorage.getItem('report') || '{}')
      localStorage.setItem('report', JSON.stringify({ ...value, [path]: v}))
      this.refresh()
      },
      immediate: true
    }
  },

  computed: {
    attrs() {
      return this.node.attrs || {}
    },
    query() {
      return this.$route.query
    }
  },
  methods: {
    async refresh() {
      const { tab: key, period } = this.$route.query
      if(!key) return
      try {
        this.loading = true
        this.values = await db(this.$route.path).get(`/${key}`, { params: { period } })
      } catch(e) {
        console.error(e)
      } finally {
        this.loading = false
      }
    },
    setValue(index) {
      const {key: tab } = this.attrs.values[index] || {}
      const query = {...this.query, tab }
      this.$router.push({ query })
    }
  }
}
</script>

<style scoped>
  .report-tabs >>> a {
    color: black  !important;
  }

</style>