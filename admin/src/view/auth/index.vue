<template>
  <div>
    <b-modal ref="modal" hide-footer :title="user">
      <login @login="onLogin" :err="err" :loading="loading"/>
    </b-modal>
  </div>
</template>
<script>
import { db } from '@/db'

export default {
  components: { 
    Login: () => import('./Login') 
  },
  data: () => ({
    user: '',
    resolve: null,
    err: {},
    loading: false
  }),

  methods: {
    show (user) {
      this.user = user
      return new Promise((resolve) => {
        this.resolve = resolve
        this.err = { }
        this.$refs['modal'].show()
      })
    },
    async onLogin (password) {
      this.loading = true
      try {
        await db('/auth').post('/login', { user: this.user, password })
        this.$refs['modal'].hide()
        this.resolve()
      } catch (err) {
        console.error(err);
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
