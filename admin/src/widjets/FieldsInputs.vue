<template>
  <div>
    <div v-for="(field) in schema" :key="field.key" >
      <div class="form-group row m-0 mt-2">
        <label class="col-sm-3 col-form-label" >{{ field && field.value || field.key }}</label>
        <b-input
          class="col"
          v-bind="field"
          rows="5"
          :value="value[field.key]"
          @input="(v) => setValue(field.key, v)"
          @change="(v) => $emit('change', v)"/>
      </div>
    </div>
  </div>
</template>

<script>

export default {
  name: 'FieldInputs',
  props: ['field', 'value', 'schema'],
  components: {
    FieldsList: () => import('./FieldsList.vue')
  },
  methods: {
    setValue(key, value) {
      this.value[key] = value
      this.$emit('input', this.value)
    }
  }
}
</script>

<style>

</style>
