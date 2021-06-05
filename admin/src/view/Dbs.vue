<template>
  <div class="p-5">
    <b-card-group deck v-if="!loading">
      <b-card v-for="({ name, description}, i) in dbs" :key="i">
        <template #header>
          <div class="card__menu">
            <b-dropdown no-caret variant="outline">
              <template #button-content>
                <b-icon icon="three-dots-vertical"></b-icon>
              </template>
              <b-dropdown-item-button @click="onCopy(name)">Copy</b-dropdown-item-button>
            </b-dropdown>
          </div>
        </template>
        <b-card-body @click="onLogin(name).then(() => $router.push('/profile'))">
          <b-card-title>{{ name }}</b-card-title>
          <b-card-text>{{ description }}</b-card-text>
        </b-card-body>
      </b-card>
    </b-card-group>
    <div v-else>
      <b-skeleton-table 
      :rows="5"
      :columns="4"
      :table-props="{ bordered: true, striped: true }"
      ></b-skeleton-table>
    </div>
    <modal-login ref="modal-login"/>
    <modal-copy ref="modal-copy"/>
  </div>
</template>

<script>
import { mapActions, mapGetters } from 'vuex'
import ModalCopy from '@/components/ModalCopy.vue'
import ModalLogin from '@/components/ModalLogin.vue'

export default {
  components: { ModalCopy, ModalLogin },
  data: () => ({
    loading: false
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
    ...mapActions(['updateDbs']),
    onLogin(name) {
      return this.$refs['modal-login'].show(name)
    },
    async onCopy(name) {
      await this.onLogin(name)
      this.$refs['modal-copy'].show(name)
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
