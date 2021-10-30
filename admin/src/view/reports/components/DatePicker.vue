<template>
  <div class="label-select row m-0">
  <label v-if="attrs.label" class="flex-center mr-3" for="input">
    {{ attrs.label }}
  </label>
  <b-form-input class="date-picker col-2" type="date"
    :placeholder="'attrs.placeholder'"
    :value="query[key] || null"
    @change="(value) => setValue(key, value)"/>
  </div>
</template>

<script>
export default {
  name: 'DatePicker',
  props: ['attrs'],
  computed: {
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