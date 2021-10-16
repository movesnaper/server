<template>
  <div class="label-select row m-0">
    <label v-if="attrs.label" class="flex-center mr-3" 
    for="input">{{ attrs.label }}</label>
    <b-form-select class="col"
    :value="value && value[key] || null"
    @input="(value) => setValue(key, value)"
    text-field="value"
    value-field="key"
    v-bind="attrs">
      <template #first v-if="attrs['no-selected']">
        <b-form-select-option :value="null">{{ attrs['no-selected'] }}</b-form-select-option>
      </template>
    </b-form-select>
  </div>
</template>

<script>
export default {
  props: ['value', 'node', 'label'],
  computed: {
    attrs() {
      return this.node.attrs || {}
    },
    key() {
      return this.attrs.key
    }
  },
  methods: {
    setValue(key, value) {
      this.$emit('input', {...this.value, [key]: value})
    }
  }
}
</script>

<style>

</style>