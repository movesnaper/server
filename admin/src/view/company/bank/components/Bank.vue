<template>
  <fields-inputs :fields="schema" :value="bank"  @change="save"/>
</template>

<script>
import { FieldsInputs } from '@/widjets'

export default {
  props: ['value', 'schema'],
  components: { FieldsInputs },
  computed: {
    bank () {
      return this.value.bank || {}
    }
  },
  methods: {
    save ({ key, value }) {
      const bank = { ...this.bank, [key]: value }
      this.$emit('save', { ...this.value, bank })
    }
  }

}
</script>

<style>

</style>
