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
                <div v-if="!loading" class="p-3" style="text-align: center;">
                    <div class="row border" style="font-weight: bold;">
                        <div class="col border-right">{{ t('row title') }}</div>
                        <div class="col-1 border-right">{{ t('row cod') }}</div>
                        <div class="col-2 border-right">{{ t('row month start') }}</div>
                        <div class="col-2">{{ t('row month end') }}</div>
                    </div>
                    <div v-for="(item, i) in rows" :key="i">
                      <fin-results-row :item="item" :value="dataValue"/>
                    </div>
                </div>
                <div v-else>
                  <b-skeleton-table 
                  :rows="5"
                  :columns="4"
                  :table-props="{ bordered: true, striped: true }"
                  ></b-skeleton-table>
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
import { db } from '@/db'
import HrTable from './HeaderTable'
import FinResultsRow from './FinResultsRow'
import { summ, toNumber, moment } from '@/functions'
import mix from './mix'
const format = 'YYYY-MM-DD'

export default {
components: { HrTable, FinResultsRow },
  mixins: [ mix ],
  data() {
    return {
      zoom: 90,
      loading: false,
      dataValue: {}
    }
  },
  async created() {
    this.refresh()
  },
  watch: {
    quarter() {
      this.refresh()
    }
  },
  computed: {
    range({ year }) {
      const quarter = year.quarter(this.quarter)
      const start = moment.range(quarter.clone().startOf('quarter'), quarter.clone().endOf('quarter'))
      const end = moment.range(year.clone().startOf('year'), year.clone().endOf('year'))
      return { start, end }
    },
    quarterRange({ year }) {
      const quarter = year.quarter(this.quarter)
      const start = quarter.clone().startOf('quarter')
      const end = quarter.clone().endOf('quarter')
      return { 
        start: start.format(format),
        end: end.format(format)
      }
    },
    yearRange({ year, quarterRange }) {
      const start = year.clone().startOf('year')
      return { 
        start: start.format(format),
        end: quarterRange.end
      }
    },
    rows({ t }) {
      return [
        { title: `${t('credit results')}` },
        { title: `${t('summ')} ${t('credits issued')}, ${t('including')}`, style: 'first', kod: '10', value: (v) => summ(v.issuedGold, v.issuedThings) },
        { title: `${t('gold and stounes')}`, style: 'second', kod: '11', value: (v) => v.issuedGold },
        { title: `${t('things')}`, style: 'second', kod: '11', value: (v) => v.issuedThings },
        { title: `${t('ocenka')}`, style: 'first', kod: '20', value: (v) => v.issuedOcenka },
        { title: `${t('summ')} ${t('credits payed')}, ${t('including')}`, kod: '30', value: (v) => summ(v.payedByMoney, v.payedBySale) },
        { title: `${t('payed by money')}`, style: 'second', kod: '31', value: (v) => v.payedByMoney },
        { title: `${t('payed by sale')}`, style: 'second', kod: '32', value: (v) => v.payedBySale },
        { title: `${t('summ')} ${t('procent calculated')}`, kod: '40', value: (v) => v.procentIssued },
        { title: `${t('summ')} ${t('procent payed')}, ${t('including')}`, kod: '50', value: (v) => summ(v.procentIssued, v.procentPayed) },
        { title: `${t('payed by money')}`, style: 'second', kod: '51', value: (v) => summ(v.procentIssued, v.procentPayed) },
        { title: `${t('payed by sale')}`, style: 'second', kod: '52', value: () => '-' },
        { title: `${t('summ')} ${t('penalty payed')}, ${t('including')}`, kod: '60', value: (v) => v.penalty },
        { title: `${t('payed by money')}`, style: 'second', kod: '61', value: (v) => v.penalty },
        { title: `${t('payed by sale')}`, style: 'second', kod: '62', value: () => '-' },
        { title: `${t('income amount')}, ${t('including')}`, kod: '80', value: (v) => summ(v.procentIssued, v.procentPayed, v.penalty) },
        { title: `${t('procent payed')}`, kod: '81', style: 'second', value: (v) => summ(v.procentIssued, v.procentPayed) },
        { title: `${t('penalty payed')}`, kod: '82', style: 'second', value: (v) => v.penalty },
        { title: `${t('credits info')}` },
        { title: `${t('col')} ${t('credits issued')}, ${t('including')}`, style: 'first', kod: '100', value: (v) => summ(v.issuedGoldCount, v.issuedThingsCount) },
        { title: `${t('gold and stounes')}`, style: 'second', kod: '101', value: (v) => v.issuedGoldCount },
        { title: `${t('things')}`, style: 'second', kod: '102', value: (v) => v.issuedThingsCount },
        { title: `${t('col')} ${t('payed by sale')}`, style: 'first', kod: '107', value: (v) => v.payedBySaleCount },
        { title: `${t('rent')}`, style: 'first', kod: '110', value: (v) => v.rent }
      ]
    },
    title({ quarter, year, t }) {
      return `${t('h3')} ${quarter} квартал ${year.format('YYYY')} г.`
    }

  },
  methods: {
    summ(...values) {
      return values.reduce((cur, v) => {
        return cur + toNumber(v)
      })
    },

    t(v) {
      return this.$t(`fin_results.${v}`)
    },
    async refresh() {
      this.loading = true
      const start = await db('/report').get(`/fin-result/${this.route}`, { 
        params: this.quarterRange
      })
      const end = await db('/report').get(`/fin-result/${this.route}`, { 
        params: this.yearRange
      })
      this.dataValue = { start, end }
      this.loading = false
    }
  }

}
</script>

<style>

</style>