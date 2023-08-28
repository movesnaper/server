<template>
    <div>
      <b-button variant="outline-primary"
      :disabled="!value.password"
      @click="$emit('reset')">Сбрость пароль</b-button>
    </div>
</template>

<script>


export default {
  props: ['value'],
  data: () => ({
  }),
  methods: {

  }
}
</script>

<style>

</style>