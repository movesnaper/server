<template>
  <div>
    <b-button variant="primary" @click="print" class="relative" 
    :disabled="loading || !value.period">
        <b-spinner v-if="loading" class="absolute-center"/>
        {{ attrs.label }}
    </b-button>
    <div :id="`${schema.key}`" class="printOnly">
      <node v-for="(node, i) in values" :key="i" :node="node"/>
    </div>
  </div>
</template>

<script>
import printJS from "print-js"
import { db } from '@/db'

export default {
  props: ['value', 'node'],
  inject: ['schema'],
  components: {
    Node: () => import('../Node.vue')
  },
  data: () => ({
    values: [],
    loading: false
  }),

  computed: {
    attrs() {
      return this.node.attrs || {}
    }
  },
  methods: {
    async print() {
      const values = await this.getValues()
      this.values = values.filter((v) => v)
      setTimeout(() => {
        printJS({
            printable: this.schema.key,
            type: "html",
            css: [
            'https://maxcdn.bootstrapcdn.com/bootstrap/4.0.0/css/bootstrap.min.css',
            './custom.css'
            ],
            scanStyles: false
          })   
        })
    },
    async getValues() {
      try {
        this.loading = true
        const url = `/${this.schema.key}/print`
        return  await db('/report').get(url, { params: this.value })
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
  .printOnly {
    display: none;
  }
</style>