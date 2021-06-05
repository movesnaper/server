<template>
    <b-card-group deck >
      <b-card v-for="({ name, description}, i) in items" :key="i">
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
      <modal-login ref="modal-login"/>
      <modal-copy ref="modal-copy"/>
    </b-card-group>
</template>

<script>
import ModalLogin from './ModalLogin.vue'
import ModalCopy from './ModalCopy.vue'

export default {
  props: ['items'],
  components: { ModalLogin, ModalCopy },
  methods: {
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