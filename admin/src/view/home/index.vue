<template>
  <div class="m-5">
    <b-card-group v-if="!loading" deck >
      <b-card v-for="(value, key) in data" :key="key">
        <template #header>
          <div class="card__menu">
            <b-dropdown no-caret variant="outline">
              <template #button-content>
                <b-icon icon="three-dots-vertical"></b-icon>
              </template>
            </b-dropdown>
          </div>
        </template>
        <b-card-body @click="login(key, value)">
          <b-card-title>{{ key }}</b-card-title>
        </b-card-body>
      </b-card>
      <modal-login ref="modal-login"/>
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
    ModalLogin: () => import('@/view/auth')
  },
  data: () => ({
    data: {},
    loading: false
  }),
  created () {
    this.update()
  },
  methods: {
    async update() {
      try {
        this.loading = true
        this.data = await db().get('/')
      } catch (e) {
        this.$alert(e)
      } finally {
        this.loading = false
      }
    },
    async login (name, password) {
      await this.$refs['modal-login'].show({ name, password })
      this.$router.push('/company')
    }
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
