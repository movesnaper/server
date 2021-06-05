<template>
  <div class="mt-5">
    <div v-if="!loading.dbs" class="center">
      <companies v-if="dbs.length" :items="dbs"/>
    </div>
    <div v-else>
      <b-skeleton-table 
      :rows="5"
      :columns="4"
      :table-props="{ bordered: true, striped: true }"/>
    </div>
  </div>
</template>

<script>
import { mapActions, mapGetters } from 'vuex'
import Companies from '@/components/Companies.vue'
import Login from '@/components/Login.vue'

export default {
  components: { Companies, Login },
  data: () => ({
    loading: {},
    err: {}
  }),
  async created() {
    this.loading = { dbs: true }
    try {
      await this.updateDbs()
    } catch(e) {
      console.error(e);
    } finally {
      this.loading = {}
    }
  },
  computed: {
    ...mapGetters(['dbs'])
  },
  methods: {
    ...mapActions(['updateDbs', 'login']),
    async onLogin(user) {
      this.loading = { login: true }
      try {
        await this.login({ user })
      } catch(err) {
        this.err = err
      } finally {
        this.loading = {}
      }
    }
  }
}
</script>

<style scoped>
  .login {
    /* width: 50%; */
  }
</style>
