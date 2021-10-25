<template>
  <preloader v-if="loading && loading.values"/>
  <div v-else class="table b-table table-sm">
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
      <tbody >            
        <tr :class="hovered.row" v-for="(value, i) in attrs.values" :key="i">
          <table-cell v-for="(header) in attrs.headers" :key="header.key"
          :header="header" :value="value" :class="hovered.cell"/>
        </tr>
      </tbody>
    </table>
  </div>
</template>

<script>
import Preloader from './Skeleton.vue'
import TableCell from './TableCell.vue'
export default {
  props: ['value', 'node', 'loading'],
  components: { Preloader, TableCell },
  computed: {
    attrs() {
      return this.node.attrs || {}
    },
    hovered() {
      return { [this.attrs.hovered]: 'hovered' }
    }
  },
}
</script>

<style scoped>

  .table >>> tr:hover.hovered, td:hover.hovered {
    cursor: pointer;
    background:rgb(230, 230, 230);
  }
  .table >>> table {
    width: 100%;
  }
</style>