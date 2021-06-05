<template>
  <div>
    <div class="row">
      <input type="range" class="col form-control-range mr-3"
      min="65" max="100" v-model="zoom" >
      <input class="button col-2" type="button" @click="print('printMe')" value="print">
    </div>
    <div class="mt-2" :style="{ zoom: zoom + '%' }">
    <month-range  class="no-print mb-2" style="zoom: 95%;"
    v-model="month" :range="months" :year="year"/>    
    <div id="printMe" >
      <h5>{{ logo }}</h5>
    <table   v-if="!loading"
    class="kassa table table-striped table-sm mt-2">
    <thead>
      <tr>
        <th v-for="(item, i) in header" :key="i" scope="col">{{ t(item) }}</th>
        <th scope="col">{{ okStart }}</th>
      </tr>
    </thead>
    <tbody>
        <tr v-for="(v, i) in dataValues" :key="i">
          <th scope="row">{{ v.date }}</th>
          <td>{{ v.prixod }}</td>
          <td>{{ v.ct377 }}</td>
          <td>{{ v.ct703 }}</td>
          <td>{{ v.ct704 }}</td>
          <th>{{ v.totalDt }}</th>
          <td>{{ v.rasxod }}</td>
          <td>{{ v.dt377 }}</td>
          <td>{{ v.dt703 }}</td>
          <!-- <td>{{ v.dt704 }}</td> -->
          <th>{{ v.totalCt }}</th>
          <th>{{ getOk(v.date) }}</th>
        </tr>
        <tr>
          <th scope="row"></th>
          <td>{{ total('proxod') }}</td>
          <td>{{ total('ct377') }}</td>
          <td>{{ total('ct703') }}</td>
          <td>{{ total('ct704') }}</td>
          <th>{{ total('totalDt') }}</th>
          <td>{{ total('rasxod') }}</td>
          <td>{{ total('dt377') }}</td>
          <td>{{ total('dt703') }}</td>
          <!-- <td>{{ total('dt704') }}</td> -->
          <th>{{ total('totalCt') }}</th>
          <th></th>
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
import mix from './mix'
import { toDouble, toNumber } from '../../functions'
export default {
    mixins: [ mix ],
    data: () => ({
      dataValues: [],
      okStart: '',
      loading: true
    }),
    computed: {
      header() {
        return ['date', 'prixod', 'ssuda', 'procent', 'penalty', 'totalDt', 'rasxod', 'ssuda', 'procent', 'totalCt']    
      }
    },
    async created() {
      this.refresh()
    },
    methods: {
      async refresh() {
        this.loading = true
        const params = { year: this.year, month: this.month }
        this.okStart = await db('/report').get(`/kassa/ok/${this.route}`, { params })
        this.dataValues = await db('/report').get(`/kassa/${this.route}`, { params })
        this.loading = false
      },
      getOk(date) {
        const result = this.dataValues.filter(this.isSameOrBefore(date))
          .reduce((cur, { totalCt, totalDt }) => {
            return cur + toNumber(totalDt) - toNumber(totalCt)
          }, toNumber(this.okStart))
        return toDouble(result)
      },
      total(key) {
        const total = this.dataValues.reduce((cur, v) => {
          return cur + toNumber(v[key])
        }, 0)
        return toDouble(total)
      }
    }
}
</script>

<style>
.kassa.table {
    width: 1000px;
    overflow: hidden;
}
.fixed_header tbody{
  display:block;
  width: 100%;
  overflow: auto;
}
.fixed_header thead tr {
   display: block;
}

</style>