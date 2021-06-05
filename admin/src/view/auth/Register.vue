<template>
  <div class="mt-5 center">
    <div class="register">
      <div class="form-group">
        <input type="text" class="form-control"
        placeholder="Name"
          v-model="company.name"/>
      </div>
      <div class="form-group">
        <input type="text" class="form-control"
        placeholder="Email"
          v-model="company.email"/>
      </div>
      <div class="form-group">
        <input type="text" class="form-control"
        placeholder="Password"
        v-model="company.password"/>
      </div>
      <div class="form-group flex-end">
        <button class="btn btn-primary"
        @click="register(company)">
          <b-spinner v-if="loading" class="absolute-center"/>
          {{ $t('auth.register') }}
        </button>
      </div>
      <div>
      <div> {{ $t('auth.have_account')}}
        <b-link to="login">{{ $t('auth.login') }}</b-link>
      </div>
      </div>
    </div>
  </div>
</template>

<script>
import { mapActions, mapGetters } from 'vuex'

export default {
  data() {
    return {
      company: {},
      loading: false
    }
  },
  methods: {
    ...mapActions(['register'])
  }
}
</script>

<style scoped>
  .register {
    width: 50%;
  }
</style>
