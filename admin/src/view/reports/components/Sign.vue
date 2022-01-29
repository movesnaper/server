<template>
    <div class="sign border-bottom relative">
      <div class="sign-value end-text">
        {{ attrs.value }}
      </div>
      <div class="absolute-bottom">
        <i>{{ attrs.subtitle }}</i>
      </div>
    </div>
</template>

<script>
export default {
  props: ['node'],
  computed: {
    attrs () {
      return this.node.attrs || {}
    }
  }
}
</script>

<style scoped>
  .sign-value {
    font-size: 18px;
    font-weight: 600 !important;
  }
</style>
