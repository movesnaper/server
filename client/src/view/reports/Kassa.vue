<template>
  <div class="row">Kassa {{route}}</div>
</template>

<script>
export default {
  computed: {
    route() {
      return this.$route.params.id
    }
  }
}
</script>

<style>

</style>