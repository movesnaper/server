<template>
  <fields-inputs 
  :fields="fields" 
  :value="address"
  :translate="(v) => $t(`address.${v}`)"
  @change="save"/>
</template>

<script>
import {FieldsInputs} from '@/widjets'

export default {
  components: { FieldsInputs },
  props: ['lombard'],
  data: () => ({
    fields: ['city', 'district', 'street', 'home']
  }),
  computed: {
    address({ lombard }) {
      return lombard.address || {}
    }
  },
  methods: {
    save({ name, value }) {
      const address = {...this.address, [name]: value}
      this.$emit('save', {...this.lombard, address})
    }
  }
}
</script>

<style>

</style>