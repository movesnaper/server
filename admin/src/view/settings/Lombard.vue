<template>
  <fields-inputs 
  :fields="fields" 
  :value="lombard"
  :translate="(v) => $t(`company.${v}`)"
  @change="({ name, value }) => onChange(name, value)"/>
</template>

<script>
import mix from './mix'

export default {
  mixins: [mix],
  data: () => ({
    fields: [
        'logo',
        'kod',
        'idn',
        'director',
        'bookkeeper',
        'phone'
      ]
  }),
  computed: {
    address({ user }) {
      return user.address || {}
    }
  }
}
</script>

<style>

</style>