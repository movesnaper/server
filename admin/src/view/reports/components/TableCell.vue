<template>
  <td :style="style" @click="() => showDialog(cell.is)">
    <span>{{ cell.value }}</span>
  </td>
</template>

<script>
import ReestrValue from './ReestrValue.vue'
import AccountValue from './AccountValue.vue'
export default {
  name: 'TableCell',
  props: [ 'header', 'value' ],
  components: { ReestrValue, AccountValue },
  computed: {
    cell() {
      return this.value[this.header.key]
    },
    style() {
      return  this.cell.style || this.header.style
    }
  },
  methods: {
    async showDialog(name) {
      if(!name) return
      const { default: component } = await import('./index');
      this.$modal.show(component[name], {...this.$props }, { height: 'auto'} )
    }
  }
}
</script>

<style>

</style>