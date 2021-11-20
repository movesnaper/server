<template>
  <td :style="style" :class="cell.class" @click="() => showDialog(cell)">
    <component v-if="cell.value"
    :is="cell.value.is || 'span'"
    v-bind="cell.value.attrs">
    {{ cell.value }}
    </component>
    <span v-else>{{ cell }}</span>
  </td>
</template>

<script>
import ReestrValue from './ReestrValue.vue'
import AccountValue from './AccountValue.vue'
export default {
  name: 'TableCell',
  props: [ 'header', 'value', 'node', 'ui' ],
  components: { ReestrValue, AccountValue },
  computed: {
    cell() {
      const value = this.value || {}
      return value[this.header.key] || ''
    },
    style() {
      return  (this.value && this.value.style) || this.header.style
    }
  },
  methods: {
    async showDialog({ is, attrs }) {
      if(!is) return
      const { default: component } = await import('./index');
      this.$modal.show(component[is], { ...this.$props, ...attrs }, { height: 'auto', ...attrs  } )
    }
  }
}
</script>

<style>

</style>