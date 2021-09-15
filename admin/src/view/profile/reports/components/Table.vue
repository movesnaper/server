<template>
  <div class="table b-table table-sm">
    <table v-bind="$attrs" >
      <thead>
        <tr>
          <th v-for="({ text, style }, i) in headers" :key="i" scope="col" :style="style">
            {{ text }}
          </th>
        </tr>
      </thead>
      <tbody>            
        <tr v-for="(value, i) in values" :key="i">
          <component 
            v-for="({ key, is, style }) in headers"
            :key="key" :is="is || 'td'"
            :style="style || value.style">
            {{ value[key] }}
          </component>
        </tr>
        <!-- <tr>
          <component v-for="({ text, type, is }, i) in footer" :key="i" :is="is || 'td'">
            {{ getValue(text, type) }}
          </component>
        </tr> -->
      </tbody>
    </table>
  </div>
</template>

<script>
import { toDouble, moment } from '@/functions'

export default {
  props: ['headers', 'values', 'footer'],
  // methods: {
  //   getValue(value, type) {
  //     switch(type) {
  //       case 'date': return moment(value).format('L')
  //       case 'double': return toDouble(value)
  //       default:  return value
  //     } 
  //   }
  // }
}
</script>

<style scoped>
  .table >>> table {
    width: 100%;
  }
</style>