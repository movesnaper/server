<template>
     <table class="table test">
      <thead :class="['relative', $attrs['max-height'] && 'sticky']">
        <tr class="px-2 ">
          <th v-for="(field) in fields" :key="field.key">{{ field.text }}</th>
        </tr>
      </thead>
        <slot></slot>
        <tbody>
          <tr v-for="({value = {}}, index) in [...values, {}]" :key="index">
            <td class="px-1" v-for="(field) in fields" :key="field.key">
              <component 
              :is="field.is || 'b-input'" 
              v-bind="field"
              :value="value[field.key]"
              @change="setValue">
                {{ value[field.key] }}
              </component>
            </td>
          </tr>
        </tbody>
    </table>
</template>

<script>
export default {
  props: ['values'],
  created() {
    console.log(this.values);
  },
  computed: {
    fields() {
      return [
      { key: 'dt', text: 'Дт', width: '10%'},
      { key: 'ct', text: 'Ст', width: '10%'},
      { key: 'description', text: 'Описание' },
      { key: 'document', text: 'Док-т', width: '10%' },
      { key: 'count', text: 'К-во', width: '8%' },
      { key: 'summ', text: 'Сумма', width: '15%' }
    ]
    }
  },
  methods: {
    setValue() {
      console.log(v);
    }
  }
}
</script>

<style scoped>
  .table >>> .modal-body {
    height: 300px;
    overflow: scroll;
  }
</style>