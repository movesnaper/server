<template>
  <div class="p-5">
    <div class="accordion" role="tablist">
      <b-card v-for="(item, index) in items" :key="index" no-body>
        <b-card-header class="py-0 pointer" role="tab" v-b-toggle="`program-${index}`">
          <program-item class="program-item" :item="item" @remove="() => remove(index)">
            <b-dropdown v-if="visible[index]" no-caret variant="outline">
              <template #button-content>
                <b-icon icon="three-dots-vertical"></b-icon>
              </template>
              <b-dropdown-item-button @click="add(item)">Копировать</b-dropdown-item-button>
              <b-dropdown-item-button @click="remove(index)">Удалить</b-dropdown-item-button>
            </b-dropdown>
          </program-item>
        </b-card-header>
        <b-collapse
        v-model="visible[index]"
        :id="`program-${index}`" 
        :ref="`program-${index}`" 
        accordion="accordion" 
        role="tabpanel">
          <b-card-body>
            <program-settings :item="item" @change="(v) => change(index, v)"/>
          </b-card-body>
        </b-collapse>
      </b-card>
      <add-btn icon="plus-circle" variant="success" @click="add"/>
    </div>
  </div>
</template>

<script>
import { db } from '@/db'
export default {
  components: {
    ProgramItem: () => import('./ProgramItem.vue'),
    ProgramSettings: () => import('./ProgramSettings.vue'),
    AddBtn: () => import('./Button.vue'),
  },
  data: () => ({
    visible: {},
    items: [],
    loading: false
  }),
  created() {
    this.refresh()
  },
  methods: {

    async save(items) {
      try {
        return db('/program').post('/values', items)
      } catch(e) {
        console.error(e);
      }
    },
    async change(index, value) {
      this.items[index] = value
      await this.save(this.items)
      return this.items.splice(index, 1, value)
    },
    async refresh() {
      try {
        this.items = await db('/program').get('/values')
      } catch(e) {
        console.error(e);
      }
    },
    async remove(index) {
      const items = this.items.filter((v, i) => i !== index)
      await this.save(items)
      return this.items.splice(index, 1)
    },
    async add({ settings }) {
      const index = this.items.push({ settings })
      await this.save(this.items)
      return this.visible[index] = true
      // return this.items.push({ })
    }
  }
}
</script>

<style scoped>
  .program-item {
    height: 45px;
  }
  .tab >>> .nav-link.active{
    background-color: initial;
    color: #007bff !important;
  }
</style>