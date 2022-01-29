<template>
  <div class="m-5">
    <b-card-group v-if="!loading" deck >
      <b-card v-for="({ key, value}, i) in menu" :key="i">
        <b-card-body @click="() => $router.push(`/reports/${key}`)">
          <!-- <b-card-title>{{ key }}</b-card-title> -->
          <b-card-text>{{ value }}</b-card-text>
        </b-card-body>
      </b-card>
    </b-card-group>
    <div v-else>
      <b-skeleton-table
      :rows="5"
      :columns="4"
      :table-props="{ bordered: true, striped: true }"/>
    </div>
  </div>
</template>

<script>
import { db } from '@/db'

export default {
  components: { 
  },
  data: () => ({
    menu: [],
    loading: false
  }),
  async created () {
    try {
      this.loading = true
      const params = { key: 'menu' }
      this.menu = await db(`/company/reports`).get(`/schema`, { params })
    } catch (e) {
      this.$alert(e)
    } finally {
      this.loading = false
    }
  },
  methods: {

  }
}
</script>

<style scoped>
  .card .card-body {
    padding: 10px;
  }
  .card >>> .dropdown-toggle {
    padding: 0;
  }
  .card .card__menu {
    display: flex;
    justify-content: flex-end;
  }
  .card >>> .card-body {
    cursor: pointer;
  }
  .card >>> .card-body:hover {
    background-color: #00000008;
  }
  .card-deck .card {
    max-width: calc(25% - 30px);
  }
</style>
