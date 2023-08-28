<template>
  <fields-tabs 
  :schema="schema"
  :loading="loading"
  v-model="value"
  @change="saveSync">
  </fields-tabs>
</template>

<script>

import { db } from '@/db'
import company from '../../company/index.vue'

export default {
  name: 'Lombard',
  mixins: [company],
  methods: {
    async update (silent) {
      if (!silent) this.loading = true
      try {
        this.value = await db(this.url).get(`/${this.$route.params.id}`)
      } catch (e) {
        this.$alert(e)
      } finally {
        this.loading = false
      }
    },
    async save (key) {
      console.log(key, this.value[key]);
      const value = this.value[key]
      try {
        const { rev } = await db(`${this.url}/${key}`).post(`/${this.$route.params.id}`, {value})
        this.value = {...this.value, _rev: rev }
      } catch (e) {
        this.$alert(e)
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
