<template>
  <div class="m-5">
    <b-card-group v-if="!loading" deck >
      <b-card v-for="({ name, description}, i) in items" :key="i">
        <template #header>
          <div class="card__menu">
            <b-dropdown no-caret variant="outline">
              <template #button-content>
                <b-icon icon="three-dots-vertical"></b-icon>
              </template>
              <!-- <b-dropdown-item-button @click="copy(name)">Copy</b-dropdown-item-button> -->
            </b-dropdown>
          </div>
        </template>
        <b-card-body @click="() => login(name).then(() => $router.push('/company'))">
          <b-card-title>{{ name }}</b-card-title>
          <b-card-text>{{ description }}</b-card-text>
        </b-card-body>
      </b-card>
      <modal-login ref="modal-login"/>
      <!-- <modal-copy ref="modal-copy"/> -->
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
    ModalLogin: () => import('@/view/auth'),
    // ModalCopy: () => import('../../components/ModalCopy.vue')
  },
  data: () => ({
    items: [],
    loading: false
  }),
  async created () {
    try {
      this.loading = true
      this.items = await db().get('/')
    } catch (e) {
      this.$alert(e)
    } finally {
      this.loading = false
    }
  },
  methods: {
    async login (name) {
      await this.$refs['modal-login'].show(name)
      localStorage.setItem('login', name)
    },

    // async copy (name) {
    //   await this.login(name)
    //   const modal = this.$refs['modal-copy']
    //   modal.show(name)
    // }
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
