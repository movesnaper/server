<template>
  <div>
    <div v-for="(key, i) in fields" :key="i" class="form-group row m-0 mt-2">
      <label class="col-sm-4 col-form-label" >{{ key }}</label>
      <input type="text" class="col form-control" :value="company[key]"
      @change="({ target }) => onChange(key, target)">
    </div>
    <div class="form-group row m-0 mt-2">
      <label class="col-sm-4 col-form-label" >days</label>
      <div v-for="(key, i) in days" :key="i" class="col">
        <div style="text-align: center;">{{ key }}</div>
        <input type="text" class="col form-control" :value="(company.days || {})[key]"
        @change="({ target }) => onChange(...getValue('days', key, target))">
      </div>
    </div>
    <div class="form-group row m-0 mt-2">
      <label class="col-sm-4 col-form-label" >rows</label>
      <div v-for="(key, i) in rows" :key="i" class="col">
        <div style="text-align: center;">{{ key }}</div>
        <input type="text" class="col form-control" :value="(company.rows || {})[key]"
        @change="({ target }) => onChange(...getValue('rows', key, target))">
      </div>
    </div>
  </div>
</template>

<script>
import { mapGetters, mapActions } from 'vuex'

export default {
  data: () => ({
    fields: ['menu', 'discount', 'statment'],
    days: ['min', 'max'],
    rows: ['kassa', 'obespechenie']
  }),
  computed: {
    ...mapGetters({
      company: 'company'
    })
  },
  methods: {
    ...mapActions({ save: 'save' }),
    onChange(key, { value }) {
      this.save({...this.company, [key]: value })
    },
    getValue(name, key, { value: v }) {
      const value = {...this.company[name], [key]: v }
      return [name, { value }]
    }
  }
}
</script>

<style>

</style>