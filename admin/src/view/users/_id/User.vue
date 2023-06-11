<template>
  <fields-inputs :fields="schema" v-model="model" @change="$emit('change')"/>
</template>

<script>
import { FieldsInputs } from '@/widjets'
import { db } from '@/db'

export default {
  components: { FieldsInputs },
  props: ['value', 'fieldKey'],
  data: () => ({
    schema: []
  }),
  async created () {
    try {
      const params = { key: this.fieldKey }
      this.schema = await db('/company').get('/users/schema', { params })
    } catch (e) {
      this.$alert(e)
    }
  },
  computed: {
    model: {
      get() {
        return (this.value && this.value[this.fieldKey]) || {}
      },
      set({ key, value }) {
        this.$emit('input', {...this.value, [this.fieldKey]: {...this.model, [key]: value} })
      }
    }
  }
}
</script>

<style>

</style>
