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
    <infinite-loading direction="top" :identifier="infiniteId" @infinite="infiniteHandler"/>
    <account-table :values="values"/>
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
  created() {
    this.refresh()
  },
  computed: {},
  methods: {
    async infiniteHandler($state) {
      const where = { account: { [this.header.key]: this.value.account } }
      const params = { where, search: this.search, page: this.page }
      const { rows } = await db('/report').post('/balance/reestr', params )
      console.log(rows);
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

<style>

</style>
