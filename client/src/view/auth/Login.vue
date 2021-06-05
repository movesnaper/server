<template>
  <div class="mt-5 center">
    <div class="login">
      <div class="form-group">
        <input type="text" class="form-control"
          :placeholder="t('login')"
          v-model="value.login"/>
          <p class="error" v-if="err.name">{{ t('err', err.name) }}</p>
      </div>    
      <div class="form-group">
        <input type="password" class="form-control" 
          :placeholder="t('password')"
          v-model="value.password"/>
          <p class="error" v-if="err.password">{{ t('err', err.password) }}</p>
          <b-link to="passworrd-recovery">{{ t('passworrd_recovery') }}</b-link>
      </div>
      <div class="form-group flex-end">
        <button class="btn btn-primary relative" 
        @click="onLogin" 
        :disabled="loading || disabled">
          <b-spinner v-if="loading" class="absolute-center"/>
          {{ t('login') }}
        </button>
      </div>
      <div> {{ t('no_account')}}
        <b-link to="register">{{ $t('auth.register') }}</b-link>
      </div>
    </div>
  </div>
</template>

<script>
import { mapActions } from 'vuex'

export default {
  data: () => ({
    value: {},
    err: {},
    loading: false
  }),
  computed: {
    disabled({ value }) {
      return ['login', 'password'].some((name) => !value[name])
    }
  },
  methods: {
    ...mapActions(['login']),
    async onLogin(user) {
      this.loading = true
      try {
        await this.login(user)
      } catch (err) {
        this.err = err
      } finally {
        this.loading = false
      }
    },
    t(...params) {
      return this.$t(`auth.${params.join('.')}`)
    }
  }
}
</script>

<style scoped>
  .login {
    width: 30%;
  }
  .error {
    color: red;
  }
</style>
