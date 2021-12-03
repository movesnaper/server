<template>
  <b-button variant="outline" @click.stop="click" class="relative" :disabled="loading">
    <b-icon :icon="icon" :variant="variant"/>
    <b-spinner v-if="loading" :variant="variant" class="absolute-center"/>
  </b-button>
</template>

<script>

export default {
  props: ['variant', 'icon'],
  data: () => ({
    loading: false
  }),
  methods: {
    async click() {
      if (this.$listeners['click']) {
        this.loading = true
        await this.$listeners['click']()
        this.loading = false
      }
    }
  }

}
</script>

<style>

</style>