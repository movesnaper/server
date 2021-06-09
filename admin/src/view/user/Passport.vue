<template>
  <fields-inputs 
  :fields="fields" 
  :value="passport"
  :translate="(v) => $t(`user.passport.${v}`)"
  @change="({ name, value }) => onChange('passport', {...passport, [name]: value })"/>
</template>

<script>
import mix from './mix'
export default {
  mixins: [mix],
  data: () => ({
    fields: ['seria','number',{ name: 'issued', is: 'b-form-textarea' }]
  }),
  computed: {
    passport({ user }) {
      return user.passport || {}
    }
  }
}
</script>

<style>

</style>