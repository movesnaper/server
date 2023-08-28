<template>
  <div class="mba-table">
    <table class="table table-sm">
    <thead >
      <tr>
        <th v-for="(field, index) in fields" :key="index">
          {{field.value !== undefined ? field.value : field}}
        </th>
      </tr>
    </thead>
    <tbody >
      <tr v-for="(item, index) in items"  :key="index"
        :class="{active: active === index}">
      <td 
      v-for="(field) in item.schema || fields" :key="field.key || field" 
        :style="{'vertical-align': 'unset', width: field.width}">
        <slot
          :name="field.key || field"
          :item="{...item, index}"
          :index="index">
        </slot>
      </td>
      </tr>
      <tr class="footer">
        <slot  name="footer"/>
      </tr>
    </tbody>
    </table>
  </div>
</template>

<script>
export default {
  props: ['fields', 'items'],
  data () {
    return {
      active: false
    }
  },
  methods: {
    emit (name, data) {
      this.active = false
      this.$emit(name, data)
    }
  }
}
</script>

<style>
  .mba-table .table  thead th {
    border-bottom: none;
  }
  .mba-table .table   tr {
    border-bottom: 1px solid #0000001f;
  }
  .mba-table .table td,   .mba-table .table th {
    border-top: none;
    border-right: 1px solid #00000033;
    vertical-align: middle;
  }
  .mba-table table{
    border: 1px solid rgba(0, 0, 0, 0.22);
  }
  tr.active{
    background-color: #0000001a;
  }
  .vue-context li:hover {
    background-color: #0000000a;
  }
  .vue-context li {
    padding-left: 10px;
    list-style: none;
    cursor: pointer;
  }
  .vue-context i {
    float: right;
    line-height: inherit;
    padding-right: 10px;
  }
</style>
