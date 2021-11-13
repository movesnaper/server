<template>
  <div class="modal-content">
    <div class="modal-header title">
      <div class="col">
        <strong class="mr-2">{{ { dt: 'Дебет', ct: 'Кредит' }[key] }}</strong>
        <strong>{{ account.value }}</strong>
      </div>
      <transition name="fade">
        <b-button v-if="Object.values(selected).some((v) => v)"
        class="danger p-0" variant="link" @click="remove">Удалить</b-button>
      </transition>
      <button type="button" class="close" @click="$emit('close')">
        <span aria-hidden="true">&times;</span>
      </button>
    </div>
    <div class="modal-body pt-0">
      <skeleton v-if="loading"></skeleton>
      <reestr-table v-else :schema="schema" 
        :values="values" 
        :selected.sync="selected"
        @change="save">
        <!-- <b-progress v-if="saving" class="progress"  height="2px" :value="loadValue"></b-progress> -->
        <infinite-loading direction="top" :identifier="infiniteId" @infinite="infiniteHandler"/>
      </reestr-table>
    </div>
    <div class="modal-footer">
    </div>
  </div>    
</template>

<script>
import { db } from '@/db'
import InfiniteLoading from 'vue-infinite-loading'
import ReestrTable from './ReestrTable.vue'
import Skeleton from './Skeleton.vue'

export default {
  props: ['header', 'value'],
  components: {InfiniteLoading, ReestrTable, Skeleton},
  data() {
    return {
      schema: [],
      values: [],
      loading: false,
      saving: false,
      page: 0,
      infiniteId: +new Date(),
      selected: {}
    }
  },
  async created() {
    try {
      this.loading = true
      this.schema = await db('/report').get('/balance/reestr/schema', { params: this.params })
      this.refresh()
    } catch(e) {
      console.error(e);
    } finally {
      this.loading = false
    }
  },
  computed: {
    account() {
      return this.value.account
    },
    key() {
      return this.header.key
    },
    params() {
      return { ...this.$route.query, key: this.key, value: this.account.value }
    }
  },
  methods: {

    async remove() {
      const values = Object.keys(this.selected).filter((key) => this.selected[key])
      try {
        await db('/report').remove('/balance/reestr/values', { data: { values } })
        this.values = this.values.filter((v) => !this.selected[v.id])
        this.$attrs.refresh()
        this.selected = {}
      } catch(e) {
        console.error(e);
      }
    },
    async save(value, index = this.values.length) {
      try {
        this.saving = true
        const { id } = await db('/report').post('/balance/reestr/values', {
          value: {...value, [this.key]: this.account.value },
          params: this.params
        } )
        this.values.splice(index, 1, {...value, id })
        this.$attrs.refresh()
      } catch(e) {
        console.error(e);
      } finally {
        this.saving = false
      }      
    },
    async infiniteHandler($state) {
      const params = {...this.params, page: this.page }
      const res = await db('/report').get('/balance/reestr/values', { params } )
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

<style scoped>
  div >>>.modal-body {
    height: 300px;
    overflow-y: scroll;
  }
  .fade-enter-active, .fade-leave-active {
    transition: opacity 1s;
  }
  .fade-enter, .fade-leave-to /* .fade-leave-active до версии 2.1.8 */ {
    opacity: 0;
  }
</style>
