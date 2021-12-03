<template>
  <fields-inputs 
  :fields="fields" 
  :value="lombard"
  :translate="(v) => $t(`company.${v}`)"
  @change="({ name, value }) => save({...lombard, [name]: value})"/>
</template>

<script>
import {FieldsInputs} from '@/widjets'

export default {
  components: { FieldsInputs },
  props: ['lombard'],
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
  methods: {
    save({ name, value }) {
      this.$emit('save', {...this.lombard, [name]: value})
    }
  }
}
</script>

<style>

</style>