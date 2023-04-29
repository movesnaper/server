<template>
  <div class="m-5">
    <b-card v-if="!loading" no-body class="company">
      <b-tabs v-model="active" small card class="company-tabs">
        <b-tab v-for="(tab, index) in schema.tabs || []" :key="index" 
        :title="getTitle(tab)">
          <fields-inputs
          v-bind="tab"
          :fieldKey="tab.key"
          v-model="company[tab.key]" 
          :schema="schema[tab.key]"
          @change="() => saveSync(tab.key)"/>
        </b-tab>
      </b-tabs>
    </b-card>
    <div v-else>
      <b-skeleton-table
      :rows="5"
      :columns="4"
      :table-props="{ bordered: true, striped: true }"
      ></b-skeleton-table>
    </div>
  </div>
</template>

<script>
import { db } from '@/db'
import { debounce } from 'vue-debounce'

export default {
  name: 'Company',
  components: { 
    FieldsInputs: () => import('@/widjets/FieldsInputs.vue'), 
    FieldsList: () => import('@/widjets/FieldsList.vue'),  
  },
  data: (vm) => ({
    active: 0,
    loading: false,
    company: {},
    schema: {},
    saveSync: debounce(vm.save, 300)
  }),
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
      this.schema = await db('/schema').get('/company')
    } catch (e) {
      this.$alert(e)
    }
  },
  methods: {

    getTitle({ value, key}) {
      return value || key
    },
    async refresh () {
      try {
        this.loading = true
        this.company = await db('/company').get()
      } catch (e) {
        this.$alert(e)
      } finally {
        this.loading = false
      }
    },
    async save(key) {
      console.log(this.company[key]);
      try {
        const {rev} = await db('/company').post(`/${key}`, this.company[key])
        this.company[key] = {...this.company[key], _rev: rev}
      } catch (e) {
        this.$alert(e)
      }      
    }

  }

}
</script>

<style scoped>
  .company-tabs {
    border: 1px solid #00000029;
  }
  .tabs >>> .card-body {
    padding-top: 0;
  }
</style>
