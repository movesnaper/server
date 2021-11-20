<template>
  <div class="label-select row m-0">
    <label v-if="attrs.label" class="flex-center mr-3" for="input">
      {{ attrs.label }}
    </label>
    <span v-if="printMode">{{ printValue }}</span>
    <b-form-select v-else class="col"
    :value="value"
    v-on="$listeners"
    @input="(value) => $listeners.input ? $emit('input', value) : setValue(key, value)"
    text-field="value"
    value-field="key"
    v-bind="attrs">
      <template #first v-if="attrs['no-selected']">
        <b-form-select-option>{{ attrs['no-selected'] }}</b-form-select-option>
      </template>
    </b-form-select>
  </div>
</template>

<script>
export default {
  name: 'Selector',
  props: ['printMode'],
  computed: {
    attrs() {
      const { attrs } = this.$attrs.node || {}
      return attrs || this.$attrs
    },
    key() {
      return this.attrs.key
    },
    query() {
      return this.$route.query || {}
    },
     value() {
      return this.$attrs.value || this.query[this.key] || null
    },   
    printValue() {
      const { options } = this.attrs
      const { value } = options.find((v) => v.key == this.query[this.key]) || {}
      return value
    }
  },
  methods: {
    setValue(key, value) {
      const query = {...this.query, [key]: value !== null ? value : undefined }
      this.$router.push({ query })
    }
  }
}
</script>

<style>

</style>