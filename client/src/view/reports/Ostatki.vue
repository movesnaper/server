<template>
  <div  class="row" style="font-size: 14px;">
    <input type="range" class="col form-control-range mr-3"
    min="65" max="100" v-model="zoom" >
    <input class="button col-2" type="button" @click="print('printMe')" value="print">
    <div class="row m-0 mt-2" :style="{ zoom: zoom + '%' }">
    <month-range  class="no-print mb-2" style="zoom: 95%;"
    v-model="month" :range="months" :year="year"/>    
    <div id="printMe" >
      <h5>{{ logo }}</h5>
      <h5>{{ title }}</h5>
    <table   class="kassa table table-striped table-sm mt-2">
    <thead>
        <tr>
          <th scope="col">#</th>
          <th v-for="(item, i) in header" :key="i" scope="col">{{ t(item) }}</th>
        </tr>
    </thead>
    <tbody>
        <tr v-for="(item, i) in items" :key="i">
            <th>{{ item.i }}</th>
            <th>{{ item.number }}</th>
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
            <th></th>
            <th></th>
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
    title({ monthRange, format }) {
      const { end } = monthRange
      return `${this.t('vedomost ostatkov')} ${format(end)}`
    },
    header() {
      return ['bilet', 'date', 'fio', 'ssuda', 'title', 'proba', 'ves', 'price', 'ocenca',]
    },
    numbers({ reestr, klientsMap, monthRange }) {
      const { start, end } = monthRange
      return reestr.filter(({ number, ref }) => number && !ref)
        .filter(this.isSameOrBefore(end))
          .filter(this.usedBefore(end))
            .map(v => ({...v, klient: klientsMap[v.klient]}))    
    },
    totalSsuda({ numbers }) {
      return summ(...numbers.map(v => v.ssuda))
    },
    obespechenie({ numbers }) {
      let i = 1
      return numbers.map(v => {
        v.obespechenie[0] = { ...v.obespechenie[0], ...v, i }
        i = i + 1
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
    usedBefore(date) {
      const { used, isBefore } = this
      return v => !used[v._id] || !moment(used[v._id].date).isBefore(date, 'day')
    }
  }

}
</script>

<style>

</style>