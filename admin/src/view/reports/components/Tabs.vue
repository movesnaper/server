<template>
  <b-tabs  small card class="report_tabs"
  :value="tabs.findIndex((v) => v.key === query.key)"
  @input="setValue">
    <b-tab v-for="({ key, title }) in tabs" :key="key" :title="title">
      <skeleton v-if="loading"/>
      <node v-else v-for="(node, i) in values" :key="i" :node="node"/>
    </b-tab>
  </b-tabs>
</template>

<script>
export default {
  props: ['node', 'loading'],
  components: {
    Skeleton: () => import('./Skeleton.vue'),
    Node: () => import('../Node.vue')
  },
  computed: {
    attrs() {
      return this.node.attrs || {}
    },
    tabs() {
      return this.attrs.tabs || []
    },
    values() {
      return this.attrs.values || []
    },
    query() {
      return this.$route.query
    }
  },
  methods: {
    setValue(index) {
      const {key} = this.tabs[index]
      const query = {...this.query, key }
      this.$router.push({ query })
    }
  }
}
</script>

<style scoped>
  .report_tabs >>> a {
    color: black  !important;
  }
</style>