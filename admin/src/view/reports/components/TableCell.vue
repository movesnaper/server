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
  inject: ['ui'],
  props: [ 'header', 'value' ],
  components: { ReestrValue, AccountValue },
  computed: {
    cell() {
      const value = this.value || {}
      return value[this.header.key] || ''
    },
    style() {
      return  this.cell.style || this.header.style
    }
  },
  methods: {
    async showDialog({ is, attrs }) {
      if(!is) return
      const { default: component } = await import('./index');
      this.$modal.show(component[is], {...this.$props, 
        refresh: async (dialog) => {
          await this.ui.refresh()
          dialog && dialog.close()
        }
      }, { height: 'auto', ...attrs  } )
    }
  }
}
</script>

<style>

</style>