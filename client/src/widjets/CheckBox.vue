<template>
  <div class="checkbox">
    <input v-model="model" class="mr-3"  type="checkbox" :checked="value">
    <label class="form-label" >{{ placeholder }}</label>
  </div>
</template>

<script>
export default {
  props: ['value', 'placeholder'],
  computed: {
    model: {
      get() {
        return this.value
      },
      set(value) {
        const target = { value }
        this.$emit('input', {target})
      }
    }
  }
}
</script>

<style lang='scss' scoped>
  .checkbox {
    border: none;
    // padding: 0;
  }
</style>