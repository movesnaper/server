<template>
  
    <div class="modal-content">
      <div class="modal-header title">
        <span>{{ header.text }}</span>
        <span>{{ value.account }}</span>
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
      values: {},
      loading: false,
      page: 0,
      infiniteId: +new Date()
    }
  },
  async created() {
    await this.init()
    this.refresh()
  },
  computed: {},
  methods: {
    init() {
      try {
        this.loading = true
        const schema = await db('/report').post('/balance/reestr/schema' )
        this.schema = schema
      } catch(e) {
        console.error(e);
      } finally {
        this.loading = false
      }
    },
    async infiniteHandler($state) {
      const where = { account: { [this.header.key]: this.value.account } }
      const params = { where, search: this.search, page: this.page }
      const { rows, total } = await db('/report').post('/balance/reestr/values', params )
      this.total = total
      if (rows.length) {
        this.page += 1
        this.values.unshift(...rows.reverse())
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
