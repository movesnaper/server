<template>
  <div  class="row">
    <input type="range" class="col form-control-range mr-3"
    min="65" max="100" v-model="zoom" >
    <input class="button col-2" type="button" @click="print('printMe')" value="print">
    <div class="row m-0 mt-2" :style="{ zoom: zoom + '%' }">
    <month-range  class="no-print mb-2" style="zoom: 95%;"
    v-model="month" :range="months" :year="year"/>    
    <div id="printMe" >
      <h4>{{ title }}</h4>
    <table   class="kassa table table-striped table-sm mt-2">
    <thead>
        <tr>
          <th v-for="(item, i) in header" :key="i" scope="col">{{ t(item) }}</th>
        </tr>
    </thead>
    <tbody>
        <tr v-for="(item, i) in items" :key="i">
            <th scope="row">{{ item.number }}</th>
            <td>{{ format(item.date) }}</td>
            <td>{{ fio(item.klient) }}</td>
            <td style="text-align: right">{{ item.ssuda }}</td>
            <td>{{ item.title }}</td>
            <td >{{ item.proba }}</td>
            <td style="text-align: right">{{ item.ves }}</td>
            <td style="text-align: right">{{ item.price }}</td>
            <td style="text-align: right">{{ item.ocenca }}</td>

        </tr>
        <tr style="text-align: right; font-weight: bold">
            <th scope="row"></th>
            <td></td>
            <td></td>
            <td>{{ totalSsuda }}</td>
            <td></td>
            <td></td>
            <td></td>
            <td></td>
            <td>{{ totalOcenca }}</td>

        </tr>
    </tbody>
    </table>
    </div>
    </div>
  </div>
</template>

<script>
import { summ, mult, moment } from '@/functions'
import mix from './mix'
export default {
  mixins: [ mix ],
  computed: {
    title({ route, lombardsMap, monthRange, format }) {
      const { end } = monthRange
      const { logo } = {...lombardsMap[route] }
      return `Vedomost ostatkov ${logo} na ${format(end)}`
    },
    header() {
      return ['bilet', 'date', 'fio', 'ssuda', 'title', 'proba', 'ves', 'price', 'ocenca',]
    },
    numbers({ reestr, klientsMap }) {
      return reestr.filter(v => v.number)
        .filter(v => !v.ref).map(v => ({...v, klient: klientsMap[v.klient]}))    
    },
    totalSsuda({ numbers }) {
      return summ(...numbers.map(v => v.ssuda))
    },
    obespechenie({ numbers }) {
      return numbers.map(v => {
        v.obespechenie[0] = { ...v.obespechenie[0], ...v }
        return v
      })
    },
    items({ obespechenie }) {
      return obespechenie
        .reduce((cur, v) => [...cur, ...v.obespechenie ], [])
    },
    totalOcenca({ items }) {
      return summ(...items.map(v => v.ocenca || 0))
    },
  },
  methods: {

  }

}
</script>

<style>

</style>