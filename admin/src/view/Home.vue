<template>
  <div class="m-5">
    <div v-if="!loading">
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

export default {
  components: { Companies },
  data: () => ({
    loading: false,
    err: {}
  }),
  async created() {
    this.loading = true
    try {
      await this.updateDbs()
    } catch(e) {
      console.error(e);
    } finally {
      this.loading = false
    }
  },
  computed: {
    ...mapGetters(['dbs'])
  },
  methods: {
    ...mapActions(['updateDbs'])
  }
}
</script>

<style scoped>
  .login {
    /* width: 50%; */
  }
</style>
