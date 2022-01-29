<template>
  <div>
    <b-modal ref="modal" hide-footer :title="company">
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
    company: '',
    resolve: null,
    err: {},
    loading: false
  }),

  methods: {
    show (company) {
      this.company = company
      return new Promise((resolve) => {
        this.resolve = resolve
        this.err = { }
        this.$refs['modal'].show()
      })
    },
    async onLogin (user) {
      this.loading = true
      try {
        await db('/auth').post('/login', { company: this.company, user })
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
