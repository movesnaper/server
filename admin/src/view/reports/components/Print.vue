<template>
  <div>
    <b-button variant="primary" @click="getValues" class="relative" :disabled="loading">
        <b-spinner v-if="loading" class="absolute-center"/>
        Печать
    </b-button>
    <div :id="url" class="printOnly">
      <node v-for="(node, i) in schema" :key="i" :node="node" :printMode="true"/>
    </div>
  </div>
</template>

<script>
import printJS from "print-js"
import { db } from '@/db'

export default {
  props: ['ui'],
  components: {
    Node: () => import('../Node.vue')
  },
  data: () => ({
    schema: [],
    loading: false
  }),
  computed: {
    url() {
      return this.$route.path
    },
    attrs() {
      return this.$attrs.node
    }
  },

  watch: {
    schema() {
      this.print()
    }
  },

  methods: {

    async print() {
      setTimeout(() => {
        printJS({
          printable: this.url,
          type: "html",
          scanStyles: false,
          css: [
          'https://maxcdn.bootstrapcdn.com/bootstrap/4.0.0/css/bootstrap.min.css',
          '/custom.css'
          ]
        })
        this.loading = false
      }, 2000)
    },
    async getValues() {
      try {
        this.loading = true
        this.schema = await db(this.url).get('/print', { params: this.$route.query })
      } catch(err) {
        this.$alert({err})
      } finally {
        // this.loading = false
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