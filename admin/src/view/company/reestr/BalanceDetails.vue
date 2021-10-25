<template>
  <div class="balance-details">
    <infinite-loading direction="top" :identifier="infiniteId" @infinite="scroll">
      <div slot="no-more" style="dispay: none"></div>
      <div slot="no-results" style="dispay: none"></div>      
    </infinite-loading>
    <div class="row m-0  details" v-for="(item, i) in items" :key="i">
      <div class="col-1">{{ moment(item.date).format('DD.MM.YYYY') }}</div>
      <div class="col-1">{{ item.dt }}</div>
      <div class="col-1">{{ item.ct  }}</div>
      <div class="col">{{ description(item) }}</div>
      <div class="col-2">{{ item.summ }}</div>
    </div>
    <div class="row m-0 details">
      <div class="col-3">
        <b-button variant="outline" @click="add">
          <b-icon icon="plus-circle" variant="success"/>
        </b-button>
      </div>
    </div>
  </div>
</template>

<script>
import InfiniteLoading from 'vue-infinite-loading'
import { moment } from '@/functions'

export default {
  props: ['values'],
  components: { InfiniteLoading },
  data: () => ({
    infiniteId: +new Date(),
    page: 0,
    items: []
  }),
  methods: {
    moment,
    add() {

    },
    async scroll($state) {
      const items = [...this.values].slice(this.page * 10, (this.page += 1) * 10)
      if (items.length) {
        this.items.unshift(...items)
        $state.loaded()
      } else $state.complete()
    },
    description({ description, dt, ct, number = '' }) {
      const value = this.$t(`accounts.dt${dt}-ct${ct}`)
      return description || `${value} ${number}`
    } 
  }
}
</script>

<style scoped>
  .balance-details {
    max-height: 150px;
    overflow-y: auto;
  }
  .details {
    min-height: 30px;
    border-bottom: 1px solid #dee2e6;
  }
  .details >>> div {
    border-right: 1px solid #dee2e6;
    /* padding-left: 10px; */
  }
</style>