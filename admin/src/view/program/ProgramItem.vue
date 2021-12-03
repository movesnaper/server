<template>
  <div v-b-hover="handleHover" class="flex-center" style="font-size: 18px">
    <div >
      <strong class="px-2">{{ item.version }}</strong>
      <span style="font-size: 14px; ">
        {{ date }}
      </span>
    </div>
    <div class="col"></div>
      <slot></slot>
      <!-- <remove-btn v-if="hovered" icon="x" @click="remove"/> -->
  </div>
</template>

<script>
import moment from 'moment'
export default {
  props: ['item'],
  components: {
    RemoveBtn: () => import('./Button.vue')
  },
  data: () => ({
    hovered: false
  }),
  computed: {
    date() {
      return moment(this.item.date).format('DD.MM.YYYY')
    }
  },
  methods: {
    handleHover(hovered) {
      this.hovered = hovered
    },
    remove() {
      return this.$listeners['remove']()
    }
  }
}
</script>

<style>

</style>