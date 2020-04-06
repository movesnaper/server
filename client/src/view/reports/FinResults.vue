<template>
  <div  class="row" style="font-size: 14px;">
    <quorter-range  class="col" style="zoom: 65%;"
    v-model="quarter" :range="quarters" :year="year"/>   
    <input type="range" class="col form-control-range mr-3"
    min="65" max="100" v-model="zoom" >
    <input class="button col-1" type="button" @click="print('printMe')" value="print">
    <div class="row m-0 mt-5" :style="{ zoom: zoom + '%' }">
 
    <div  id="printMe" >
             <div class="col">
                 <hr-table :value="{ h1: t('h1'), h2: t('h2'), h3: title }"/>

                <div class="p-3" style="text-align: center;"> <!-- table -->
                    <div class="row border" style="font-weight: bold;">
                        <div class="col border-right">{{ t('row title') }}</div>
                        <div class="col-1 border-right">{{ t('row cod') }}</div>
                        <div class="col-2 border-right">{{ t('row month start') }}</div>
                        <div class="col-2">{{ t('row month end') }}</div>
                    </div>
                    <div v-for="(item, i) in rows" :key="`1${i}`">
                      <fin-results-row :value="item" :summ="summ" :range="range"/>
                    </div>
                    <div v-for="(item, i) in [
                        { title: `${t('credits info')}` },
                        { title: `${t('col')} ${t('credits issued')}, ${t('including')}`, style: 'first', kod: '100', values: get(v => v.dt ==='377') },
                        { title: `${t('gold and stounes')}`, style: 'second', kod: '101', values: get(v => v.dt ==='377').filter(v => v.zalog === 'gold') },
                        { title: `${t('things')}`, style: 'second', kod: '102', values: get(v => v.dt ==='377').filter(v => v.zalog !== 'gold') },
                        { title: `${t('col')} ${t('payed by sale')}`, style: 'first', kod: '107', values: get(v => v.dt === '200') },
                    ]" :key="`3${i}`">
                      <fin-results-row :value="item" :summ="col" :range="range"/>
                    </div>
                    <fin-results-row :summ="rent" :range="range"
                    :value="{ title: `${t('rent')}`, style: 'first', kod: '110', values: get(v => v.dt ==='377') }"/>
                </div>
             </div>
             <div class="row mt-5"> <!-- sign director -->
                 <div class="col"></div>
                 <div class="col"><sign :value="{ post: 'director', name: lombard.director }"/></div>
             </div>
             <div class="row mt-5"> <!-- sign bookkeeper --> 
                 <div class="col"></div>
                 <div class="col"><sign :value="{ post: 'bookkeeper', name: lombard.bookkeeper }"/></div>
             </div>
        </div>
    </div>
  </div>
</template>

<script>
import HrTable from './HeaderTable'
import FinResultsRow from './FinResultsRow'
import { summ, toNumber, moment } from '@/functions'
import mix from './mix'
export default {
components: { HrTable, FinResultsRow },
  mixins: [ mix ],
      data() {
        return {
          zoom: 70
        }
      },
  computed: {
    range({ year }) {
      const quarter = year.quarter(this.quarter)
      const start = moment.range(quarter.clone().startOf('quarter'), quarter.clone().endOf('quarter'))
      const end = moment.range(year.clone().startOf('year'), year.clone().endOf('year'))
      return { start, end }
    },
    rows({ t, get, gold, things }) {
        return [
            { title: `${t('credit results')}` },
            { title: `${t('summ')} ${t('credits issued')}, ${t('including')}`, style: 'first', kod: '10', values: get(v => v.dt ==='377') },
            { title: `${t('gold and stounes')}`, style: 'second', kod: '11', values: get(v => v.dt ==='377').filter(v => v.zalog === 'gold') },
            { title: `${t('things')}`, style: 'second', kod: '11', values: get(v => v.dt ==='377').filter(v => v.zalog !== 'gold') },
            { title: `${t('ocenka')}`, style: 'first', kod: '20', values: get(v => v.dt ==='377').map(v => ({...v, summ: v.ocenca})) },
            { title: `${t('summ')} ${t('credits payed')}, ${t('including')}`, kod: '30', values: get(v => v.ct ==='377') },
            { title: `${t('payed by money')}`, style: 'second', kod: '31', values: get(v => v.ct ==='377' && v.dt === '301') },
            { title: `${t('payed by sale')}`, style: 'second', kod: '32', values: get(v => v.dt === '200') },
            { title: `${t('summ')} ${t('procent calculated')}`, kod: '40', values: get(v => v.ct ==='703') },
            { title: `${t('summ')} ${t('procent payed')}, ${t('including')}`, kod: '50', values: get(v => v.ct ==='703') },
            { title: `${t('payed by money')}`, style: 'second', kod: '51', values: get(v => v.ct ==='703') },
            { title: `${t('payed by sale')}`, style: 'second', kod: '52', values: get(v => false) },
            { title: `${t('summ')} ${t('penalty payed')}, ${t('including')}`, kod: '60', values: get(v => v.ct ==='704') },
            { title: `${t('payed by money')}`, style: 'second', kod: '61', values: get(v => v.ct ==='704') },
            { title: `${t('payed by sale')}`, style: 'second', kod: '62', values: get(v => false) },
            { title: `${t('income amount')}, ${t('including')}`, kod: '80', values: get(v => v.ct ==='703' || v.ct ==='704') },
            { title: `${t('procent payed')}`, kod: '81', style: 'second', values: get(v => v.ct ==='703') },
            { title: `${t('penalty payed')}`, kod: '82', style: 'second', values: get(v => v.ct ==='704') },

        ]
    },
    title({ quarter, year, t }) {
      return `${t('h3')} ${quarter} квартал ${year.format('YYYY')} г.`
    }

  },
  methods: { toNumber,
    summ(values) {
      const res = summ(...values.map(v => v.summ))
      return toNumber(res) ? res : '-'
    },
    col(values) {
      return values.filter(v => toNumber(v.summ)).length || '-'
    },
    rent(values) {
      return '-'
    },
    get(filter) {
      const values = v => ({...v, ...v.values.filter(filter)[0]})
      return this.reestr.map(values)
    },
    t(v) {
        return this.$t(`fin_results.${v}`)
    }
  }

}
</script>

<style>

</style>