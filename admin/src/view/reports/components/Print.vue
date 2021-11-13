<template>
  <div>
    <b-button variant="primary" @click="print" class="relative" 
      :disabled="loading || !params.period">
        <b-spinner v-if="loading" class="absolute-center"/>
        Печать
    </b-button>
    <div :id="url" class="printOnly">
      <node v-for="(node, i) in values" :key="i" :node="node"/>
    </div>
  </div>
</template>

<script>
import printJS from "print-js"
import { db } from '@/db'

export default {
  props: ['node'],
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
    },
    url() {
      return this.$route.path
    },
    params() {
      return this.$route.query
    }
  },
  methods: {
    async print() {
      this.values = await this.getValues()
      setTimeout(() => {
        printJS({
            printable: this.url,
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
        return await db(this.url).get('/print', { params: this.params })
      } catch(err) {
        this.$alert({err})
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