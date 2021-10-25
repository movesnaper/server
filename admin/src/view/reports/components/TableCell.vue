<template>
  <td :style="style">
    <component :is="value.is || 'span'" v-bind="$props" >
      {{ value[header.key] }}
    </component>
  </td>
</template>

<script>
import Account from './Account.vue'
export default {
  props: [ 'header', 'value' ],
  components: { Account },
  computed: {
    style() {
      return this.header.style || this.value.style
    }
  }
}
</script>

<style>

</style>