<template>
  <div>
    <div v-for="item in fields" :key="item" class="form-group row m-0 mt-2">
      <label class="col-sm-4 col-form-label" >{{ item }}</label>
      <input type="text" class="col form-control" :value="lombard[item]"
      @change="({ target }) => onChange(item, target.value)">
    </div>
    <div class="form-group row m-0 mt-2">
      <label class="col-sm-4 col-form-label" >days</label>
      <div v-for="item in days" :key="item" class="col">
        <div style="text-align: center;">{{ item }}</div>
        <input type="text" class="col form-control" :value="{...lombard.days }[item]"
        @change="({ target }) => onChange('days', {...lombard.days, [item]: target.value})">
      </div>
    </div>
    <div class="form-group row m-0 mt-2">
      <label class="col-sm-4 col-form-label" >rows</label>
      <div v-for="item in rows" :key="item" class="col">
        <div style="text-align: center;">{{ item }}</div>
        <input type="text" class="col form-control" :value="{...lombard.rows }[item]"
        @change="({ target }) => onChange('rows', {...lombard.rows, [item]: target.value})">
      </div>
    </div>
  </div>
</template>

<script>
import mix from './mix'
export default {
  mixins: [ mix ],
  computed: {
    fields() {
      return ['number', 'menu', 'discount', 'statment', 'excludes']
    },
    days() {
      return ['min', 'max']
    },
    rows() {
      return ['kassa', 'obespechenie']
    }
  },
  methods: {}
}
</script>

<style>

</style>