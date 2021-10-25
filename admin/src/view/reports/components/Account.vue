<template>
  <div @click="showDialog">
    <span >{{ value[header.key] }}</span>
  </div>
</template>

<script>
import AccountDialog from './AccountDialog'
export default {
  props: ['header', 'value'],
  methods: {
    async showDialog() {
     this.$modal.show(AccountDialog, this.$props )
    }
  }
}
</script>

<style>

</style>