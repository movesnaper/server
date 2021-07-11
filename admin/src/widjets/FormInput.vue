<template>
  <div class="relative" style="width: fit-content">
    <b-form-input
    class="relative"
    aria-invalid="input-live-feedback"
    trim
    type="search"
    :state="err ? false : null"
    v-model="value"
    :disabled="loading"
    @change="onChange">
    </b-form-input>
    <b-spinner small variant="primary" v-if="loading" class="absolute-center"/>
    <b-form-invalid-feedback id="input-live-feedback">
      {{ $t('conflict') }}
    </b-form-invalid-feedback>
</div>
</template>

<script>
export default {
  props: ['action'],
  data: () => ({
    loading: false,
    value: '',
    err: ''
  }),
  watch: {
    value(v) {
      if(!v) this.clear()
    }
  },
  methods: {
    async onChange(v) {
      if(!v) return
      this.loading = true
      try {
        await this.action(v)
        this.clear()
      } catch({ message }) {
        this.err = message
      } finally {
        this.loading = false
      }      
    },
    clear() {
      this.value = ''
      this.err = ''
    }
  }
}
</script>

<style>

</style>