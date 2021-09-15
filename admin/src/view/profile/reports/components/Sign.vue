<template>
  <div class="sign">
    <div v-for="({ post, fio}, i) in schema" :key="i"  class="row mt-5">
      <div class="col"></div>
      <div class="col">
        <div class="row">
          <div class="col">{{ post }}</div>
          <div class="col border-bottom"></div>
          <div class="col ">{{ fio }}</div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  props: ['schema']
}
</script>

<style scoped>

</style>