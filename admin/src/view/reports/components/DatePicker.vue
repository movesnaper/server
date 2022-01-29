<template>
  <div class="label-select row m-0">
    <label v-if="attrs.label" class="flex-center mr-3" for="input">
      {{ attrs.label }}
    </label>
    <span v-if="printMode">{{ printValue }}</span>
    <b-form-input v-else class="date-picker col-2" :type="attrs.type || 'date'"
      :placeholder="'attrs.placeholder'"
      :value="value"
      v-on="$listeners"
      @input="(value) => $listeners.input ? $emit('input', value) : setValue(key, value)"/>
  </div>
</template>

<script>
import moment from 'moment'
export default {
  name: 'DatePicker',
  props: ['printMode'],
  computed: {
    attrs () {
      const { attrs } = this.$attrs.node || {}
      return attrs || {}
    },
    key () {
      return this.attrs.key
    },
    query () {
      return this.$route.query || {}
    },
    value () {
      return this.$attrs.value || this.query[this.key]
    },
    printValue () {
      return moment(this.value).format('DD.MM.YYYY')
    }
  },
  methods: {
    setValue (key, value) {
      const query = { ...this.query, [key]: value }
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
