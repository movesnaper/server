<template>
  <div>
    <!-- <div class="form-group">
      <input type="text" class="form-control"
      :placeholder="$t(`auth.name`)"
      v-on:keyup.enter="disabled ? $refs['password'].focus() : $emit('login', value)"
      v-model="value.name"/>
        <p class="error" v-if="err.name">{{ t('err', err.name) }}</p>
    </div> -->
    <div class="form-group">
      <input type="password" class="form-control"
        ref="password"
        :placeholder="$t(`auth.password`)"
        v-on:keyup.enter="!disabled && $emit('login', password)"
        v-model="password"/>
        <p class="error" v-if="err.password">{{ t('err', err.password) }}</p>
    </div>
    <div class="form-group flex-end">
      <button class="btn btn-primary relative"
      @click="$emit('login', password)"
      :disabled="loading || !password">
        <b-spinner v-if="loading" class="absolute-center"/>
        Войти
      </button>
    </div>
  </div>
</template>

<script>
export default {
  props: ['err', 'loading'],
  data: () => ({
    password: ''
  })
}
</script>

<style scoped>
  .error {
    color: red;
  }
</style>
