<template>
  <div class="lombards m-5">
    <data-table v-if="!loading" class="lombards-table" :items="lombards" :fields="schema">
      <template #index="{index}">{{index + 1}}</template>
      <template #name="{item, index}">
        <warnings :item="item" :index="index"/>
      </template>
      <template #program="{item, index}">
        <div class="px-2">
          <b-form-select
          :value="item.program"
          @input="(program) => save({...item, program}, index)"
          :options="programs.map((v) => v.version)"/>
        </div>
      </template>
      <template #token="{item, index}" >
        <div class="row m-0 px-2">
          <b-input class="col mr-2" type="text" :disabled="!item.active" :value="item.token" readonly/>
            <b-button variant="outline" :id="`copy-${index}`" @click="copy(item).then(showTooltip)">
              <b-icon icon="stickies"/>
            </b-button>
            <b-tooltip
            :disabled="true"
            :ref="`copy-${index}`"
            :delay="50"
            :target="`copy-${index}`" variant="light">{{ $t('lombards.copy_token')}}</b-tooltip>
        </div>
      </template>
      <template #active="{item, index}">
        <div class="col">
          <b-form-checkbox :checked="item['active']"
          @change="save({...item, active: !item.active}, index)"/>
        </div>
      </template>
      <template #remove="{item, index}">
        <b-button  variant="link" >
          <b-icon icon="trash" @click="remove(item, index)" variant="danger"/>
        </b-button>
      </template>
      <template #footer_index>
        <div class="center">
          <b-icon icon="plus-circle" variant="success"/>
        </div>
      </template>
      <template #footer_name>
        <form-input :action="(name) => save({ name }, lombards.length)"/>
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
    Warnings: () => import('./components/warnings/index.vue'), 
    DataTable, 
    FormInput 
  },
  data: () => ({
    lombards: [],
    programs: [],
    loading: false,
    schema: {}
  }),
  async created () {
    try {
      this.schema = await db('/schema').get('/lombards')
    } catch (e) {
      this.$alert(e)
    }
    this.update()
  },
  methods: {
    async update () {
      try {
        this.loading = true
        this.lombards = await db('/lombards').get()
        this.programs = await db('/programs').get()
      } catch (e) {
        this.$alert(e)
      } finally {
        this.loading = false
      }
    },

    async save (value, index) {
      try {
        const { id } = await db('/company').post('/lombards', value)
        this.lombards.splice(index, 1, { ...value, _id: id })
      } catch (e) {
        this.$alert(e)
      }
    },

    async remove ({ _id }, index) {
      try {
        const dialog = await this.$confirm({ name: _id })
        await db('/company').remove('/lombards', { data: { _id } })
        this.items.splice(index, 1)
        dialog.close()
      } catch (e) {
        this.$alert(e)
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
  .lombards >>> .list-group-item {
    border-left: initial;
    border-right: initial;
  }
</style>
