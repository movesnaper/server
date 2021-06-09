<template>
  <fields-inputs 
  :fields="fields" 
  :value="address"
  :translate="(v) => $t(`address.${v}`)"
  @change="({ name, value }) => onChange('address', {...address, [name]: value })"/>
</template>

<script>
import mix from './mix'

export default {
  mixins: [mix],
  data: () => ({
    fields: ['city', 'district', 'street', 'home']
  }),
  computed: {
    address({ lombard }) {
      return lombard.address || {}
    }
  }
}
</script>

<style>

</style>