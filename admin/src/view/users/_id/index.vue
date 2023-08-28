<template>
  <fields-tabs 
  :schema="schema"
  :loading="loading"
  v-model="value"
  @change="saveSync">
    <template #ui>
      <user-ui :value="value" @reset="reset(value)"/>
    </template>
  </fields-tabs>
</template>

<script>

import lombards from '../../lombards/_id/index.vue'
import { db } from '@/db'

export default {
  name: 'User',
  mixins: [lombards],
  components: { 
    UserUi: () => import('./components/UserUI.vue')
  },

  methods: {
    async reset ({_id}) {
      const dialog = await this.$confirm({ name: _id, header: 'Сбросить пароль' })
      try {
        await db(`${this.url}`).remove(`/password/${_id}`)
        this.update(true)
      } catch (e) {
        this.$alert(e)
      } finally {
        dialog.close()
      }
    }
  }

}
</script>

<style scoped>
  /* .component-tabs {
    border: 1px solid #00000029;
  } */
</style>
