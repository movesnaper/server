<template>
  <div class="reports accordion">
    <b-card no-body v-for="(item, i) in menu" :key="i">
      <b-card-header v-b-toggle="item.key">
        {{ item.text }}
      </b-card-header>
      <b-collapse :id="item.key" accordion="reports">
        <b-card-body>
          <b-tabs pills class="tab" vertical>
            <b-tab v-for="(schema) in item.tabs" :key="schema.key" :title="schema.text">
              <component 
              class="m-3" 
              :is="`template-${schema.is || 'table'}`"
              :period="item.period"
              :schema="schema"
              />
            </b-tab>
          </b-tabs>
        </b-card-body>
      </b-collapse>
    </b-card>
  </div>
</template>

<script>
import TemplateTable from './TemplateTable.vue'
import TemplateMain from './main/index.vue'
import { db } from '@/db'

export default {
  components: {
    TemplateTable,
    TemplateMain
  },
  data: () => ({
    menu: [],
    loading: false
  }),
  async created() {
    try {
      this.loading = true
      this.menu = await db('/report').get(`/`) 
    } catch (e) {
      console.error(e);
    } finally {
      this.loading = false
    }
  }
}
</script>

<style scoped>
  .reports >>> .card-header {
    background: initial;
    padding: 10px 15px;
  }
  .reports >>> .card-body {
    padding: 0;
  }
  .tabs >>> .col-auto {
    border-right: 1px solid rgba(0, 0, 0, 0.13);
  }
  .tab >>> .nav-link.active{
    background-color: initial;
    color: #007bff !important;
  }
</style>