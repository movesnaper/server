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
      </tbody>
    </table>
  </div>
</template>

<script>

export default {
  props: ['headers', 'values']
}
</script>

<style scoped>
  .table >>> table {
    width: 100%;
  }
</style>