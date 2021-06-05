<template>
  <div>
    <b-modal ref="modal" hide-footer :title="company">
      <login @login="onLogin" :err="err" :loading="loading"/>
    </b-modal>
  </div>
</template>
<script>
import { mapActions } from 'vuex'
import Login from './Login'

export default {
  components: { Login },
  data: () => ({
    company: '',
    resolve: null,
    err: {},
    loading: false
  }),

  methods: {
    ...mapActions(['login']),
    show(company) {
      this.company = company
      return new Promise((resolve) => {
        this.resolve = resolve
        this.err = { }
        this.$refs['modal'].show()
      })
    },
    async onLogin(user) {
      this.loading = true
      try {
        await this.login({ company: this.company, user })
        this.$refs['modal'].hide()
        this.resolve()
      } catch(err) {
        this.err = err
      } finally {
        this.loading = false
      }
    }
  }
}
</script>

<style scoped>

</style>