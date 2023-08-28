<template>
  <div class="form-group row " >
    <b-input-group class="col" v-for="({label, key}, index) in schema" :key="key">
      <label v-if="label" class="col-3">{{ label }}</label>
      <b-form-input
        v-bind="schema[index]"
        :fieldKey="key"
        rows="5"
        :value="getValue(key)"
        @input="(v) => setValue(key, v)"
        @change="(v) => $emit('change', v)"/>
        <template #append>
          <slot name="append"></slot>
        </template>
    </b-input-group>
  </div>
</template>

<script>

export default {
  name: 'FieldInputs',
  props: ['value', 'schema', 'fieldKey'],
  components: {
    FieldsArray: () => import('./FieldsArray.vue'),
    FieldsList: () => import('./FieldsList.vue'),
    FieldsObject: () => import('./FieldsObject.vue')
  },
  methods: {
    getValue(key = this.fieldKey) {
      return this.value && this.value[key]
    },
    setValue(key, value) {
      this.$emit('input', [key, value])
    }
  }
}
</script>

<style>

</style>
