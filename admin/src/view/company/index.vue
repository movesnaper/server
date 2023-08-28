<template>
  <fields-tabs 
  :schema="schema"
  :loading="loading"
  v-model="value"
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
  props: ['url'],
  components: { 
    FieldsTabs: () => import('@/widjets/FieldsTabs.vue')
  },
  data: (vm) => ({
    loading: false,
    schema: {},
    value: {},
    saveSync: debounce(vm.save, 300)
  }),

  async created () {
    const [hash, value] = this.$route.hash.split('#')
    try {
      this.schema = await db('/schema').get(this.url)
      if (value) this.update(value)
      else this.$router.push(`#${this.schema.tabs[0].key}`)
    } catch (e) {
      this.$alert(e)
    }
  },
  methods: {
    async update (value) {
      this.loading = true
      try {
        this.value = await db(this.url).get(`/${value}`)
      } catch (e) {
        this.$alert(e)
      } finally {
        this.loading = false
      }
    },
    async save(key) {
      try {
        const {rev} = await db(this.url).post(`/${key}`, this.value)
        this.value = {...this.value, _rev: rev}
      } catch (e) {
        this.$alert(e)
      }      
    }

  }

}
</script>

<style scoped>

</style>
