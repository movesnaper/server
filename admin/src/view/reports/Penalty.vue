<template>
  <div  class="row" style="font-size: 14px;">
    <input type="range" class="col form-control-range mr-3"
    min="65" max="100" v-model="zoom" >
    <input class="button col-2" type="button" @click="print('printMe')" :value="$t('btn.print')">
    <div class="row m-0 mt-2" :style="{ zoom: zoom + '%' }">
    <month-range  class="mb-5" style="zoom: 95%;"
      v-model="month" :range="months" :year="year"/>    
          <div id="printMe">
             <div class="col" >
                <hr-table :value="{ h1: t('h1'), h2: t('h2'), h3: title }"/>
                <div class="col" style="text-align: right; font-style: italic;">{{ t('curency') }}</div>
                <div class="p-3" style="text-align: center;" v-if="!loading" >
                    <div class="row border" style="font-weight: bold;">
                        <div class="col border-right">{{ t('row title') }}</div>
                        <div class="col-1 border-right">{{ t('row cod') }}</div>
                        <div class="col-2 border-right">{{ t('row month start') }}</div>
                        <div class="col-2">{{ t('row month end') }}</div>
                    </div>
                    <div class="row border" style="font-weight: bold; border-top: 0 !important;">
                        <div class="col border-right">1</div>
                        <div class="col-1 border-right">2</div>
                        <div class="col-2 border-right">3</div>
                        <div class="col-2">4</div>
                    </div>
                    <penalty-row v-for="({ title, kod, summ, format }, i) in items" :key="i"
                    :value="dataValue"
                    :title="title"
                    :summ="summ"
                    :format="format"
                    :kod="kod"/>
                </div>
                <div v-else>
                  <b-skeleton-table 
                  :rows="5"
                  :columns="4"
                  :table-props="{ bordered: true, striped: true }"
                  ></b-skeleton-table>
                </div>
             </div>

             <div class="row mt-5">
                <div class="col"></div>
                <div class="col"><sign :value="{ post: 'director', name: lombard.director }"/></div>
             </div>
             <div class="row mt-5">
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
import PenaltyRow from './PenaltyRow'
import { toNumber } from '@/functions'
import mix from './mix'
export default {
components: { HrTable, PenaltyRow },
  mixins: [ mix ],
  data() {
    return {
      zoom: 90,
      loading: false,
      dataValue: {},
    }
  },
  async created() {
    this.refresh()
  },
  computed: {
    items({ t }) {
      return [
        { title: `${t('summ fin credits')}, ${t('after date')}`, kod: '010', summ: (v) => v.ssuda },
        { title: `${t('summ procents')}, ${t('after date')}`, kod: '020', summ: (v) => v.procent },
        { title: `${t('summ penalty')}, ${t('after date')}`, kod: '030', summ: (v) => v.penalty },               
        { title: `${t('col fin credits')}, ${t('after date')}`, kod: '040', format: (v) => v }            
      ]
    },
    range({ monthRange }) {
      const start = monthRange.start.subtract(1, 'days')
      const end = monthRange.end
      return { start, end }
    },
    title({ monthRange, format }) {
      return `${this.t('h3')} ${format(monthRange.end)} г.`
    }
  },
  methods: { toNumber,
    t(v) {
      return this.$t(`penalty.${v}`)
    },
    async refresh() {
      const format = 'YYYY-MM-DD'
      this.loading = true
      const start = await db('/report').get(`/penalty/${this.route}`, { params: {
        date: this.range.start.format(format)
      }})
      const end = await db('/report').get(`/penalty/${this.route}`, { params: {
        date: this.range.end.format(format)
      }})
      this.dataValue = { start, end }
      this.loading = false
    }
  }

}
</script>

<style>

</style>