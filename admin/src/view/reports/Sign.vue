<template>
    <div class="row">
        <div class="col">{{ t(value.post) }}</div>
        <div class="col border-bottom"></div>
        <div class="col ">{{ fio }}</div>
    </div>
</template>

<script>
export default {
  props: { value: Object },
  methods: {
    t(v) {
      return this.$t(`post.${v}`)
    }
  },
  computed: {
    fio({ value }) {
      return value.name
    }
  }
}
</script>

<style>

</style>