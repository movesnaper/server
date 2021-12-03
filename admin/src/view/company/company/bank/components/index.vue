<template>
  <b-tabs v-model="active" small>
    <b-tab v-for="({ key, value: text }) in schema.tabs" :key="key" :title="text">
      <component 
        class="p-3" 
        :is="`component-${key}`" 
        :value="value"
        :schema="schema[key]"
        v-on="$listeners"/>
    </b-tab>
  </b-tabs>
</template>

<script>
import { db } from '@/db'

export default {
  components: {
    ComponentAccount: () => import('./Account'),
    ComponentBank: () => import('./Bank'),
    ComponentAddress: () => import('./Address')
  },
  props: ['value'],
  data: () => ({
    active: 0,
    schema: {}
  }),
  async created() {
    try {
      this.schema = await db('/company').get('/banks/schema')
    } catch(e) {
      this.$alert(e)
    } 
  }
}
</script>

<style scoped>

</style>