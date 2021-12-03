<template>
  <fields-inputs :fields="schema" :value="address"  @change="save"/>
</template>

<script>
import {FieldsInputs} from '@/widjets'

export default {
  props: ['value', 'schema'],
  components: {FieldsInputs},
  computed: {
    address() {
      return this.value.address || {}
    }
  },
  methods: {
    save({key, value}) {
      const address = {...this.address, [key]: value}
      this.$emit('save', {...this.value, address })
    }
  }

}
</script>

<style>

</style>