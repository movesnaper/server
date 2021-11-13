<template>
  <div class="label-select row m-0">
    <label v-if="attrs.label" class="flex-center mr-3" for="input">
      {{ attrs.label }}
    </label>
    <b-form-input value="" :placeholder="attrs.placeholder"></b-form-input>
    <!-- <b-form-select class="col"
    :value="query[key] || null"
    @input="(value) => setValue(key, value)"
    text-field="value"
    value-field="key"
    v-bind="attrs">
      <template #first v-if="attrs['no-selected']">
        <b-form-select-option :value="null">{{ attrs['no-selected'] }}</b-form-select-option>
      </template>
    </b-form-select> -->
  </div>
</template>

<script>
export default {
  props: ['node'],
  computed: {
    attrs() {
      return this.node.attrs || {}
    },
    // key() {
    //   return this.attrs.key
    // },
    // query() {
    //   return this.$route.query || {}
    // }
  },
  methods: {
    // setValue(key, value) {
    //   const query = {...this.query, [key]: value }
    //   this.$router.push({ query })
    // }
  }
}
</script>

<style>

</style>