<template>
  <div>
    <div v-for="(field) in schema" :key="field.key" >
      <fields-inputs
      :field="field || {}"
      :fieldKey="field.key"
      v-model="value[field.key]"
      @change="$emit('change')"/>
    </div>
  </div>

</template>

<script>

export default {
  name: 'Fields',
  components: { 
    FieldsInputs: () => import('./FieldsInputs.vue') 
  },
  props: ['value', 'schema'],
  methods: {
    setValue(key, value) {
      this.value[key], value
      this.$emit('input', this.value)
    }
  }

}
</script>

<style>

</style>
