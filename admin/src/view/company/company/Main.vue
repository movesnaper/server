<template>
  <fields-inputs :fields="schema" :value="company"
    @change="({ key, value }) => $emit('save', {...lombard, [key]: value})"/>
</template>

<script>
import { db } from '@/db'
import {FieldsInputs} from '@/widjets'

export default {
  props: ['company'],
  components: {FieldsInputs},
  data: () => ({
    schema: []
  }),
  async created() {
    try {
      const params = { key: 'main' }
      this.schema = await db('/company').get('/schema', { params })
    } catch(e) {
      this.$alert(e)
    } 
  }
}
</script>

<style>

</style>