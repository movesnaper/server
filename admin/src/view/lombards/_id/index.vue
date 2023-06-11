<template>
  <fields-tabs 
  :schema="schema"
  :loading="loading"
  :value="value"
  @change="saveSync">
  </fields-tabs>
</template>

<script>

import { db } from '@/db'
import { debounce } from 'vue-debounce'

export default {
  name: 'Lombard',
  components: { 
    FieldsTabs: () => import('@/widjets/FieldsTabs.vue')
  },
  data () {
    return {
      loading: false,
      value: {},
      schema: [],
      saveSync: debounce(this.save, 300)
    }
  },
  watch: {
    '$route.params': {
      handler () {
        this.refresh()
      },
      immediate: true
    }
  },
  async created () {
    try {
      this.schema = await db('/schema').get('/lombards')
    } catch (e) {
      this.$alert(e)
    }
  },
  methods: {
    async refresh () {
      try {
        this.loading = true
        this.value = await db('/lombards').get(`/${this.$route.params.id}`)
      } catch (e) {
        this.$alert(e)
      } finally {
        this.loading = false
      }
    },

    async save () {
      console.log(this.value);
      try {
        const { rev } = await db('/lombards').post(`/${this.$route.params.id}`, this.value)
        this.value = {...this.value, _rev: rev }
      } catch (e) {
        this.$alert(e)
      }
    }
  }

}
</script>

<style scoped>
  .component-tabs {
    border: 1px solid #00000029;
  }
</style>
