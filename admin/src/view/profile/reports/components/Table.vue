<template>
  <div class="table b-table table-sm">
    <table style="width: 100%">
      <thead>
        <tr>
          <th v-for="({ text, style }, i) in attrs.headers" 
          :key="i" 
          scope="col" 
          :style="style">
            {{ text }}
          </th>
        </tr>
      </thead>
      <tbody v-if="!loading">            
        <tr v-for="(value, i) in attrs.values" :key="i">
          <component 
            v-for="({ key, is, style }) in attrs.headers"
            :key="key" :is="is || 'td'"
            :style="style || value.style">
            {{ value[key] }}
          </component>
        </tr>
      </tbody>
      <tbody v-else>            
        <tr v-for="(value, i) in attrs.values" :key="i">
          <component 
            v-for="({ key, is, style }) in attrs.headers"
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
  props: ['value', 'node', 'loading'],
  computed: {
    attrs() {
      return this.node.attrs || {}
    }
  },
}
</script>

<style scoped>
  .table >>> table {
    width: 100%;
  }
</style>