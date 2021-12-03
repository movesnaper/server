<template>
  <fields-inputs :fields="schema" :value="address"  @change="save"/>
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
      const params = { key: 'address' }
      this.schema = await db('/company').get('/schema', { params })
    } catch(e) {
      this.$alert(e)
    } 
  },
  computed: {
    address() {
      return this.company.address || {}
    }
  },
  methods: {
    save({key, value}) {
      const address = {...this.address, [key]: value}
      this.$emit('save', {...this.company, address })
    }
  }

}
</script>

<style>

</style>