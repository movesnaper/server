<template>
  <div>
    <div class="form-group">
      <input type="password" class="form-control"
        ref="password"
        :placeholder="$t(`auth.password`)"
        v-on:keyup.enter="!disabled && $emit('login', password)"
        v-model="password"/>
        <p class="error" v-if="err.password">{{ $t(err.password) }}</p>
    </div>
    <div v-if="!value.password" class="form-group">
      <input 
        type="password" class="form-control"
        ref="confirm"
        :placeholder="$t(`auth.confirm`)"
        v-model="confirm"/>
        <p class="error" v-if="err.confirm">{{ $t(err.confirm) }}</p>
    </div>

    <div class="form-group flex-end">
      <button class="btn btn-primary relative"
      @click="$emit('login', {password, confirm})"
      :disabled="disabled">
        <b-spinner v-if="loading" class="absolute-center"/>
        Войти
      </button>
    </div>
  </div>
</template>

<script>
export default {
  props: ['value', 'err', 'loading'],
  data: () => ({
    password: '',
    confirm: ''
  }),
  computed: {
    disabled() {
      const confirm = !this.value.password && this.confirm !== this.password
      return [this.loading, !this.password, confirm].some(v => v) 
    }
  }
}
</script>

<style scoped>
  .error {
    color: red;
  }
</style>
