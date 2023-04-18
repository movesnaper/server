<template>
  <div class="row m-0">
    <node v-for="(node, i) in attrs.items" :key="i" :node="node" @input="setValue"/>
  </div>
</template>

<script>

export default {
  name: 'Period',
  components: {
    Node: () => import('../Node.vue')
  },
  computed: {
    attrs () {
      const { attrs } = this.$attrs.node || {}
      return attrs || this.$attrs
    }
  },
  methods: {
    setValue (key, value) {
      console.log('test');
      // const query = { ...this.query, [key]: value !== null ? value : undefined }
      // this.$router.push({ query })
    }
  }
}
</script>

<style>

</style>
