<template>
  <div  class="row">
    <input type="range" class="col form-control-range mr-3"
    min="65" max="100" v-model="zoom" >
    <input class="button col-2" type="button" @click="print('printMe')" value="print">
    <div class="row m-0 mt-2" :style="{ zoom: zoom + '%' }">
    <month-range  class="no-print mb-2" style="zoom: 95%;"
    v-model="month" :range="months" :year="year"/>    
    <div id="printMe" >
      <h5>{{ logo }}</h5>
    <table   class="kassa table table-striped table-sm mt-2">
    <thead>
        <tr>
            <th v-for="(item, i) in header" :key="i" scope="col">{{ t(item) }}</th>
            <th scope="col">{{ ok }}</th>
        </tr>
    </thead>
    <tbody>
        <tr v-for="(date, index) in days" :key="index">
            <th scope="row">{{ format(date) }}</th>
            <td>{{ prixod(same(date)) }}</td>
            <td>{{ ct('377', same(date)) }}</td>
            <td>{{ ct('703', same(date)) }}</td>
            <td>{{ ct('704', same(date)) }}</td>
            <th>{{ totalDt(same(date)) }}</th>
            <td>{{ rasxod(same(date)) }}</td>
            <td>{{ dt('377', same(date)) }}</td>
            <td>{{ dt('703', same(date)) }}</td>
            <td>{{ dt('704', same(date)) }}</td>
            <th>{{ totalCt(same(date)) }}</th>
            <th>{{ getOk(isSameOrBefore(date)) }}</th>
        </tr>
        <tr>
            <th scope="row"></th>
            <td>{{ prixod(monthFilter) }}</td>
            <td>{{ ct('377', monthFilter) }}</td>
            <td>{{ ct('703', monthFilter) }}</td>
            <td>{{ ct('704', monthFilter) }}</td>
            <th>{{ totalDt(monthFilter) }}</th>
            <td>{{ rasxod(monthFilter) }}</td>
            <td>{{ dt('377', monthFilter) }}</td>
            <td>{{ dt('703', monthFilter) }}</td>
            <td>{{ dt('704', monthFilter) }}</td>
            <th>{{ totalCt(monthFilter) }}</th>
            <th></th>
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
        header() {
            return ['date', 'prixod', 'ssuda', 'procent', 'penalty', 'totalDt', 'rasxod', 'ssuda', 'procent', 'penalty', 'totalCt']    
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