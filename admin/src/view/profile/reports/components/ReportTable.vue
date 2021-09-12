<template>
  <div class="table b-table table-sm">
    <table v-bind="$attrs" >
      <thead>
        <tr>
          <th v-for="({ text, style }, i) in header" :key="i" scope="col" :style="style">
            {{ text }}
          </th>
        </tr>
      </thead>
      <tbody>            
        <tr v-for="(value, i) in values" :key="i">
          <component 
            v-for="({ key, is, type, style }) in header"
            :key="key" :is="is || 'td'"
            :style="style || value.style">
            {{ getValue(value[key], type) }}
          </component>
        </tr>
        <tr>
          <component v-for="({ total, type, is }, i) in header" :key="i" :is="is || 'td'">
            {{ getValue(total, type) }}
          </component>
        </tr>
      </tbody>
    </table>
  </div>
</template>

<script>
import { toDouble, moment } from '@/functions'

export default {
  props: ['header', 'values'],
  created() {
    // console.log(this.header, this.values);
  },
  methods: {
    getValue(value, type) {
      switch(type) {
        case 'date': return moment(value).format('L')
        case 'double': return toDouble(value)
        default:  return value
      } 
    }
  }
}
</script>

<style scoped>
  .table >>> table {
    width: 100%;
  }
</style>