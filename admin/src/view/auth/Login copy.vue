<template>
  <div class="m-5" style="width: 300px;">
    <div class="form-group">
      <input type="text" class="form-control"
      placeholder="Name"
        v-model="company.name"/>
    </div>
    <div class="form-group">
      <input type="password" class="form-control"
      placeholder="Password"
        v-model="company.password"/>
    </div>
    <div class="form-group">
      <button class="btn btn-primary"
      @click="login(company).then(reload)"
      >Login</button>
    </div>
    <!-- <div> no_account ?
      <a href="#" @click="$router.push('register')"> register </a>
    </div> -->
  </div>
</template>

<script>
import { mapActions } from 'vuex'

export default {
  data() {
    return {
      company: {}
    }
  },
  methods: {
    ...mapActions(['login']),
    reload() {
      window.location.reload()
    }
  }
}
</script>

<style>

</style>
