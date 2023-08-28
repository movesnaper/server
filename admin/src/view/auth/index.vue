<template>
  <div>
    <b-modal ref="modal" hide-footer :title="value.name">
      <login :value="value" @login="login" :err="err" :loading="loading"/>
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
    value: {},
    resolve: null,
    err: {},
    loading: false
  }),

  methods: {
    show (value) {
      this.value = value
      return new Promise((resolve) => {
        this.resolve = resolve
        this.err = { }
        this.$refs['modal'].show()
      })
    },
    async login (data) {
      this.loading = true
      try {
        await db('/auth/login').post(`/${this.value.name}`, data)
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
