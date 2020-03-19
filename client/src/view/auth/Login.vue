<template>
      <div class="mt-3 " style="width: 300px;">
        <div class="form-group">
          <input type="text" class="form-control"
          placeholder="Email"
           v-model="company.email"/>
        </div>
        <div class="form-group">
          <input type="password" class="form-control"
          placeholder="Password"
           v-model="company.password"/>
        </div>
        <div class="form-group">
          <button class="btn btn-primary"
          @click="login(company)"
          >Login</button>
        </div>
<div>
    no_account ?
    <a href="#" @click="$router.push('register')"> register </a>
</div>
      </div>
</template>

<script>
import { mapActions, mapGetters } from 'vuex'

export default {
  data() {
    return {
      company: {}
    }
  },
  methods: {
    ...mapActions(['login'])

  }
}
</script>

<style>

</style>
