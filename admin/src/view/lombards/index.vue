<template>
  <div class="m-5">
    <data-table v-if="!loading" :items="data" :fields="schema">
      <template #index="{index}">{{index + 1}}</template>
      <template #name="{item}">
        <b-button variant="link" :to="`${url}/${item._id}`">{{ item._id }}</b-button>
      </template>
      <template #token="{item, index}" >
        <div class="row m-0 px-2">
          <b-form-checkbox :checked="!!item['token']" @change="activate(item)"/>
          <b-input class="col mr-2" type="text" :value="item.token" readonly/>
          <b-button 
          v-if="item['token']"
          variant="outline"
          :id="`copy-${index}`" 
          @click="copy(item).then(showTooltip)">
            <b-icon icon="stickies"/>
          </b-button>
          <b-tooltip
          :disabled="true"
          :ref="`copy-${index}`"
          :delay="50"
          :target="`copy-${index}`" variant="light">{{ $t('lombards.copy_token')}}</b-tooltip>
        </div>
      </template>
      <template #remove="{item}">
        <b-button  variant="link">
          <b-icon icon="trash" @click="remove(item)" variant="danger"/>
        </b-button>
      </template>
      <template #footer>
        <td>
          <b-icon icon="plus-circle" variant="success" />
        </td>
        <td>
          <form-input :action="add"/>
        </td>
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
  components: { DataTable, FormInput },
  data: () => ({
    url: '/lombards',
    data: [],
    loading: false,
    schema: [
      { key: 'index', value: '' },
      { key: 'name', value: 'Наименование' },
      { key: 'token', value: 'Токен' },
      { key: 'remove', value: '' }
    ]
  }),
  async created () {
    this.update()
  },
  methods: {
    async update (silent) {
      try {
        if (!silent) this.loading = true
        this.data = await db(this.url).get()
      } catch (e) {
        this.$alert(e)
      } finally {
        this.loading = false
      }
    },

    async add (id) {
      const index = this.lombards.length
      try {
        await db('/lombards').post(`/${id}`, {index, date: new Date})
      } catch (e) {
        this.$alert(e)
      } finally {
        this.update(true)
      }
    },

    async activate ({_id, active}) {
      try {
        await db(`${this.url}/active`).post(`/${_id}`, {value: !active})
      } catch (e) {
        this.$alert(e)
      } finally {
        this.update(true)
      }
    },

    async remove ({ _id, _rev }) {
      const dialog = await this.$confirm({ name: _id })
      try {
        await db(this.url).remove(`/${_id}`, {_rev})
        this.update(true)
      } catch (e) {
        this.$alert(e)
      } finally {
        dialog.close()
      }
    },

    async copy ({ token, index }) {
      const textArea = document.createElement('textarea')
      textArea.value = token
      document.body.appendChild(textArea)
      textArea.focus()
      textArea.select()
      try {
        document.execCommand('copy')
        return index
      } catch (err) {
        this.$alert(err)
      } finally {
        document.body.removeChild(textArea)
      }
    },

    showTooltip (index) {
      const el = this.$refs[`copy-${index}`]
      el.$emit('open')
      setTimeout(() => el.$emit('close'), 1000)
    }
  }
}
</script>

<style scoped>

</style>
