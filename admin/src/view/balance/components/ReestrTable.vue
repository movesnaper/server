<template>
  <div class="reestr-table">
  <table class="table ">
    <thead class="sticky">
      <tr class="px-2">
        <th v-for="(field) in schema" :key="field.key"
          :width="field.width">
          {{ field.text }}
        </th>
        <th width="5%" >
        </th>
      </tr>
    </thead>
    <tbody class="">
      <tr >
        <td :colspan="schema && (schema.length + 1)"><slot></slot></td>
      </tr>
      <tr v-for="(value, index) in values" :key="index">
        <td class="px-1" v-for="(field) in schema" :key="field.key">
          <component :is="field.is || 'b-input'"
          v-bind="field"
          :value="value[field.key]"
          @input="() => {}"
          @change="(v) => $listeners.change({...value, [field.key]: v}, index)"/>
        </td>
        <td style="vertical-align: middle;" >
          <b-form-checkbox
            :checked="selected[value.id]"
            @change="(v) => $emit('update:selected', {...selected, [value.id]: v })"/>
        </td>
      </tr>
    </tbody>

    <tfoot>
      <tr>
        <td class="px-1" v-for="(field) in schema" :key="field.key">
          <component :is="field.is || 'b-input'"
          v-bind="field"
          :value="tmp[field.key]"
          @input="(value) => setValue(field.key, value)"/>
        </td>
        <td style="vertical-align: middle;" >
          <b-button variant="outline-success" icon class="p-0 relative"
          :disabled="disabled">
            <b-spinner v-if="loading" small class="absolute-center"/>
            <b-icon icon="plus" @click="() => !disabled && save()"/>
          </b-button>
        </td>
      </tr>
    </tfoot>
  </table>
  </div>
</template>

<script>
import moment from 'moment'

export default {
  props: [ 'values', 'schema', 'selected' ],
  components: { 
    DatePicker: () => import('../../reports/components/DatePicker.vue'),
    Selector: () => import('../../reports/components/Selector.vue')
  },
  data: () => ({
    status: -1,
    tmp: {},
    loading: false
  }),
  computed: {
    disabled () {
      return this.schema.some((v) => !this.tmp[v.key])
    }
  },
  methods: {
    toggleAll (v) {
      const selected = (cur, { id }) => ({ ...cur, [id]: true })
      this.$emit('update:selected', v ? Object.values(this.values).reduce(selected, {}) : {})
    },
    async setValue (key, value) {
      const date = this.tmp.date || moment().format('YYYY-MM-DD')
      this.tmp = { ...this.tmp, date, [key]: value }
    },
    async save () {
      try {
        this.loading = true
        await this.$listeners.change(this.tmp)
        this.tmp = {}
      } catch (e) {
        console.error(e)
      } finally {
        this.loading = false
      }
    }
  }
}
</script>

<style scoped>
  .table >>> .modal-body {
    height: 500px;
    overflow: scroll;
  }
.sticky {
    position: sticky;
    top: -2px;
}
</style>
