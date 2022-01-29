<template>
  <div class="m-5">
    <div v-if="!loading" class="accordion" role="tablist">
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
      <add-btn icon="plus-circle" variant="success" @click="() => add({})"/>
    </div>
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
export default {
  components: {
    ProgramItem: () => import('./components/ProgramItem.vue'),
    ProgramSettings: () => import('./components/ProgramSettings.vue'),
    AddBtn: () => import('./components/Button.vue')
  },
  data: () => ({
    visible: {},
    items: [],
    loading: false
  }),
  watch: {
    '$route.params': {
      handler () {
        this.refresh()
      },
      immediate: true
    }
  },
  methods: {

    async save (item) {
      try {
        const { id } = await db('/company').post('/programs', item)
        return id
      } catch (e) {
        console.error(e)
      }
    },

    async change (index, value) {
      const item = this.items[index] = value
      await this.save(item)
      return this.items.splice(index, 1, value)
    },

    async refresh () {
      try {
        this.loading = true
        this.items = await db('/company').get('/programs')
      } catch (e) {
        this.$alert(e)
      } finally {
        this.loading = false
      }
    },

    async remove (index) {
      await db('/company').remove('/programs', { data: this.items[index] })
      this.items.splice(index, 1)
    },

    async add ({ settings }) {
      const _id = await this.save({ settings })
      const index = this.items.push({ _id, settings })
      this.visible[index] = true
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
