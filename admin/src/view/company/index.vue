<template>
  <fields-tabs 
  :schema="schema"
  :loading="loading"
  :value="value"
  @change="saveSync">
    <template #test>
      <h1>test</h1>
    </template>
  </fields-tabs>
</template>

<script>
import { db } from '@/db'
import { debounce } from 'vue-debounce'

export default {
  name: 'Company',
  components: { 
    FieldsTabs: () => import('@/widjets/FieldsTabs.vue')
  },
  data: (vm) => ({
    loading: false,
    value: {},
    schema: {},
    saveSync: debounce(vm.save, 300)
  }),
  watch: {
    '$route.params': {
      async handler () {
        this.loading = true
        await this.refresh()
        this.loading = false
      },
      immediate: true
    }
  },
  async created () {
    try {
      this.schema = await db('/schema').get('/company')
    } catch (e) {
      this.$alert(e)
    }
  },
  methods: {
    async refresh () {
      try {
        this.value = await db('/company').get()
      } catch (e) {
        this.$alert(e)
      }
    },
    async save(key) {
      console.log(key, this.value[key]);
      try {
        const {rev} = await db('/company').post(`/${key}`, this.value[key])
        this.value[key] = {...this.value[key], _rev: rev}
      } catch (e) {
        this.$alert(e)
      }      
    }

  }

}
</script>

<style scoped>

</style>
