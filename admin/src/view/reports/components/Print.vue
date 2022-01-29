<template>
  <div>
    <div class="row m-3">
      <div class="col"></div>
      <b-button variant="primary" @click="print" class="relative" :disabled="loading">
          <b-spinner v-if="loading" class="absolute-center"/>
          Печать
      </b-button>      
    </div>
    <div id='print'>
      <slot :print="loading"></slot>
    </div>
    <!-- <div :id="$attrs.url" class="printOnly" >
      <node v-for="(node, i) in schema" :key="i" :url="$attrs.url"  :node="node" :printMode="true"/>
    </div> -->
  </div>
</template>

<script>
import printJS from 'print-js'
// import { db } from '@/db'

export default {
  components: {
    Node: () => import('../Node.vue')
  },
  data: () => ({
    schema: [],
    loading: false
  }),
  // computed: {
  //   attrs () {
  //     return this.$attrs.node
  //   }
  // },

  // watch: {
  //   schema () {
  //     this.print()
  //   }
  // },

  methods: {
    async print () {
      this.loading = true
      this.$nextTick(() => {
        printJS({
          printable: 'print',
          type: 'html',
          scanStyles: false,
          css: [
            'https://maxcdn.bootstrapcdn.com/bootstrap/4.0.0/css/bootstrap.min.css',
            '/custom.css'
          ]
        })
        this.loading = false
      })
    },
    
    // async getValues () {
    //   try {
    //     this.loading = true
    //     const params = this.$route.query
    //     this.schema = await db(this.$attrs.url).get('/print', { params })
    //   } catch (err) {
    //     this.$alert({ err })
    //   }
    // }
  }
}
</script>

<style scoped>
  .printOnly {
    display: none;
  }
</style>
