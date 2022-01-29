<template>
  <div class="content m-5">
    <data-table v-if="!loading" class="users-table" :items="items" :fields="schema">
        <template #index="{index}">{{index + 1}}</template>
        <template #name="{item}">
          <b-button variant="link" :to="`/user/${item.name}`">{{ item.name }}</b-button>
        </template>
        <template #roles="{item, index}">
          <b-input type="text"
          :value="(item.roles || []).join(', ')"
          @change="(v) => save({...item, roles: v.split(',').map(v => v.trim())}, index)"/>
        </template>
        <template #reset="{item, index}">
          <div class="center">
            <b-button variant="outline-primary"
            :disabled="!item.active || !item.password"
            @click="() => resetPassword(item, index)">Сбрость пароль</b-button>
          </div>
        </template>
        <template #active="{item, index}">
          <div class="col">
            <b-form-checkbox :checked="item['active']"
            @change="save({...item, active: !item.active}, index)"/>
          </div>
        </template>
        <template #remove="{item, index}">
          <b-button  variant="outline">
            <b-icon icon="trash" @click="remove(item, index)" variant="danger"/>
          </b-button>
        </template>
        <template #footer_index>
          <div class="center">
            <b-icon icon="plus-circle" variant="success"/>
          </div>
        </template>
      <template #footer_name>
        <form-input :action="(name) => save({ name }, items.length)"/>
      </template>
    </data-table>
    <div v-else>
      <b-skeleton-table
      :rows="5"
      :columns="4"
      :table-props="{ bordered: true, striped: true }"/>
    </div>
  </div>
</template>

<script>
import { db } from '@/db'
import { DataTable, FormInput } from '@/widjets'

export default {
  components: { 
    DataTable, 
    FormInput 
  },
  data: () => ({
    items: [],
    schema: [],
    loading: false
  }),
  async created () {
    try {
      const params = { key: 'table-fields' }
      this.schema = await db('/company').get('/users/schema', { params })
    } catch (e) {
      this.$alert(e)
    }
    this.update()
  },
  methods: {
    async update () {
      try {
        this.loading = true
        this.items = await db('/company').get('/users')
      } catch (e) {
        this.$alert(e)
      } finally {
        this.loading = false
      }
    },

    async save (value, index) {
      try {
        const { id } = await db('/company').post('/users', value)
        this.items.splice(index, 1, { ...value, _id: id })
      } catch (e) {
        this.$alert(e)
      }
    },

    async remove ({ _id, name }, index) {
      try {
        const dialog = await this.$confirm({ name })
        await db('/company').remove('/users', { data: { _id } })
        this.items.splice(index, 1)
        dialog.close()
      } catch (e) {
        this.$alert(e)
      }
    },

    async resetPassword (value, index) {
      try {
        const dialog = await this.$confirm({ name: value.name, header: 'Сбросить пароль' })
        await this.save({ ...value, password: undefined }, index)
        dialog.close()
      } catch (e) {
        this.$alert(e)
      }
    }
  }
}
</script>

<style scoped>

</style>
