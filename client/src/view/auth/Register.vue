<template>
      <div class="mt-3 " style="width: 300px;">
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
        <div class="form-group">
          <button class="btn btn-primary"
          @click="register(company)"
          >Register</button>
        </div>
<div>
    have_account ?
    <a href="/login"> login </a>
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
    ...mapActions(['register'])

  }
}
</script>

<style>

</style>
