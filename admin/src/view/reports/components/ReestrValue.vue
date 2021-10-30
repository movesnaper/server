<template>
  <div class="modal-content">
    <div class="modal-header title">
      <span>{{ header.text }}</span>
      <span>{{ account.value }}</span>
      <button type="button" class="close" @click="$emit('close')">
        <span aria-hidden="true">&times;</span>
      </button>
    </div>
    <div class="modal-body">
      <account-table :values="values">
        <infinite-loading direction="top" :identifier="infiniteId" @infinite="infiniteHandler"/>
      </account-table>
    </div>
    <div class="modal-footer">
    </div>
  </div>    
</template>

<script>
import { db } from '@/db'
import InfiniteLoading from 'vue-infinite-loading'
import AccountTable from './AccountTable.vue'

export default {
  props: ['header', 'value'],
  components: {InfiniteLoading, AccountTable},
  data() {
    return {
      schema: {},
      values: [],
      loading: false,
      page: 0,
      infiniteId: +new Date()
    }
  },
  async created() {
    await this.init()
    this.refresh()
  },
  computed: {
    account() {
      return this.value.account
    }
  },
  methods: {
    async init() {
      // try {
      //   this.loading = true
      //   const schema = await db('/report').post('/balance/reestr/schema' )
      //   this.schema = schema
      // } catch(e) {
      //   console.error(e);
      // } finally {
      //   this.loading = false
      // }
    },
    async infiniteHandler($state) {
      const where = {
        target: `values_${this.header.key}`,
        startkey: [`${this.account.value}\uffff`],
        endkey: [this.account.value]
      }

      const params = { where, search: this.search, page: this.page }
      const res = await db('/report').post('/balance/reestr/values', params )
      if (res.rows.length) {
        this.page += 1
        this.values.unshift(...res.rows.reverse())
        $state.loaded()
      } else $state.complete()
    },
    refresh() {
      this.page = 0
      this.values = []
      this.infiniteId += 1
    },
  }
}
</script>

<style >
  div .modal-body {
    height: 300px;
    overflow-y: scroll;
  }
</style>
