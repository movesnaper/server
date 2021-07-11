<template>
  <div class="reestr">
    <div class="row ml-0 ">
      <table class="table sticky-header">
        <thead >
          <tr>
            <th v-for="({ key, width }) in fields" :key="key"
            :width="width">{{ $t(`reestr.${key}`) }}</th>
            <th width="10px">
            </th>
          </tr>
        </thead>
        <tr v-for="(item, i) in values" :key="i" :index="i">
          <td class="px-1" v-for="({ key, is, type }) in fields" :key="key">
            <component :is="is" :type="type" :value="item[key]" :disabled="loading && selected === i"
            @change="(v) => setValue(i, {...item, [key]: v })"/>
          </td>
          <td class="center px-0">
            <b-button variant="outline" >
              <b-icon icon="trash" @click.stop="remove(i)" variant="danger"/>
            </b-button>
          </td>
        </tr>
        <tr>
          <td class="px-0 py-0">
            <b-button variant="outline" @click="add" class="relative px-0 py-0" :disabled="loading">
              <b-icon icon="plus-circle" variant="success"/>
              <b-spinner v-if="loading" class="absolute-center"/>
            </b-button>
          </td>
          <td></td>
          <td></td>
          <td></td>
          <td></td>
        </tr>
      </table>
    </div>
  </div>
</template>

<script>
import mixins from '../mixins'

export default {
  mixins: [mixins],
  data: () => ({
    fields: [
      { key: 'date', width: '5%', is: 'b-input', type: 'date' },
      { key: 'dt', width: '10%', is: 'b-select' },
      { key: 'ct', width: '10%', is: 'b-select' },
      { key: 'description', is: 'b-input' },
      { key: 'count', width: '5%', is: 'b-input', type: 'number' },
      { key: 'summ', width: '10%', is: 'b-input', type: 'number' },
    ],
    loading: false
  }),
  computed: {
    values() {
      return [{}]
    },
  },
  methods: {
    add() {},
    remove() {},
    setValue() {},
    async onChange(reestr) {
      this.loading = true
      // await this.save({...this.company, reestr })
      this.loading = false
      this.update()
    }
  }
}
</script>

<style scoped>


</style>