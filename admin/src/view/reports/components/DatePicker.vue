<template>
  <div class="label-select row m-0">
  <label v-if="attrs.label" class="flex-center mr-3" for="input">
    {{ attrs.label }}
  </label>
  <b-form-input class="date-picker col-2" :type="attrs.type || 'date'"
    :placeholder="'attrs.placeholder'"
    :value="query[key] || attrs.value"
    v-on="$listeners"
    @input="(value) => $listeners.input ? $emit('input', value) : setValue(key, value)"/>
  </div>
</template>

<script>
export default {
  name: 'DatePicker',
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
    }
  },
  methods: {
    setValue(key, value) {
      const query = {...this.query, [key]: value }
      this.$router.push({ query })
    }
  }
}
</script>

<style scoped>
  .date-picker {
    min-width: 200px;
  }
</style>