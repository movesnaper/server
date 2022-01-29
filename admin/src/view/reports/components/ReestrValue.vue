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
      <button type="button" class="close" @click="close">
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

export default {
  props: ['header', 'value', 'params', 'ui'],
  components: { 
    InfiniteLoading: () => import('vue-infinite-loading'),
    ReestrTable: () => import('./ReestrTable.vue'),
    Skeleton: () => import('./Skeleton.vue')
  },
  data () {
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
  async created () {
    try {
      this.loading = true
      this.schema = await db('/company/balance').get('/reestr/schema', { params: this.params })
      this.refresh()
    } catch (e) {
      console.error(e)
    } finally {
      this.loading = false
    }
  },
  computed: {
    account () {
      return this.value.account
    },

    key () {
      return this.header.key
    }
  },
  methods: {
    close () {
      this.$emit('close')
    },

    async remove () {
      const values = Object.keys(this.selected).filter((key) => this.selected[key])
      try {
        await db('/company/balance').remove('/reestr/values', { data: { values } })
        this.values = this.values.filter((v) => !this.selected[v.id])
        this.ui.refresh(true)
        this.selected = {}
      } catch (e) {
        console.error(e)
      }
    },

    async save (value, index = this.values.length) {
      try {
        this.saving = true
        const { id } = await db('/company/balance').post('/reestr/values', {
          params: { ...this.$route.query, key: this.key, value: this.account.value },
          value: { ...value, [this.key]: this.account.value }
        })
        this.values.splice(index, 1, { ...value, id })
        await this.ui.refresh(true)
      } catch (e) {
        console.error(e)
      } finally {
        this.saving = false
      }
    },

    async infiniteHandler ($state) {
      const params = { ...this.params, value: this.account.value, page: this.page }
      const res = await db('/company/balance').get('/reestr/values', { params })
      if (res.rows.length) {
        this.page += 1
        this.values.unshift(...res.rows.reverse())
        $state.loaded()
      } else $state.complete()
    },

    refresh () {
      this.page = 0
      this.values = []
      this.infiniteId += 1
    }
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
