<template>
  <fields-inputs :fields="schema" :value="account"  @change="save"/>
</template>

<script>
import {FieldsInputs} from '@/widjets'

export default {
  props: ['value', 'schema'],
  components: {FieldsInputs},
  computed: {
    account() {
      return this.value.account || {}
    }
  },
  methods: {
    save({key, value}) {
      const account = {...this.account, [key]: value}
      this.$emit('save', {...this.value, account })
    }
  }

}
</script>

<style>

</style>