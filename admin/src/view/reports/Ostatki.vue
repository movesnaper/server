<template>
  <div  class="row" style="font-size: 14px;">
    <input type="range" class="col form-control-range mr-3"
    min="65" max="100" v-model="zoom" >
    <input class="button col-1" type="button" @click="print('printMe')" :value="$t('btn.print')">
    <div class="row m-0 mt-2" :style="{ zoom: zoom + '%' }">
    <month-range  class="no-print mb-2" style="zoom: 95%;"
    v-model="month" :range="months" :year="year"/>    
    <div id="printMe" style="width: 100%">
      <h5>{{ title }}</h5>
      <table v-if="!loading" class="kassa table table-striped table-sm mt-2">
        <thead>
          <tr>
            <th scope="col">#</th>
            <th v-for="(item, i) in header" :key="i" scope="col">{{ t(item) }}</th>
          </tr>
        </thead>
        <tbody>
          <tr v-for="(item, i) in dataValues" :key="i">
            <td>{{ item.index }}</td>
            <th>{{ item.number }}</th>
            <td>{{ item.date }}</td>
            <td>{{ item.klient }}</td>
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
            <td>{{ t('total') }}</td>
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
      <div v-else>
        <b-skeleton-table 
        :rows="5"
        :columns="4"
        :table-props="{ bordered: true, striped: true }"
        ></b-skeleton-table>
      </div>
    </div>
    </div>
  </div>
</template>

<script>
import { db } from '@/db'
import { summ } from '@/functions'
import mix from './mix'
export default {
  mixins: [ mix ],
  data: () => ({
    dataValues: [],
    loading: false
  }),
  async created() {
    this.refresh()
  },
  computed: {
    title({ monthRange, format }) {
      return `${this.t('vedomost ostatkov')} ${format(monthRange.end)}`
    },
    header() {
      return ['bilet', 'date', 'fio', 'ssuda', 'title', 'proba', 'ves', 'price', 'ocenca',]
    },
    totalSsuda({ dataValues }) {
      return summ(...dataValues.map(v => v.ssuda))
    },
    totalOcenca({ dataValues }) {
      return summ(...dataValues.map(v => v.ocenca || 0))
    }
  },
  methods: {
    async refresh() {
      this.loading = true
      const params = { year: this.year, month: this.month }
      this.dataValues = await db('/report').get(`/ostatki/${this.route}`, { params })
      this.loading = false
    }
  }

}
</script>

<style>

</style>