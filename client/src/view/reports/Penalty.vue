<template>
  <div  class="row" style="font-size: 14px;">
    <input type="range" class="col form-control-range mr-3"
    min="65" max="100" v-model="zoom" >
    <input class="button col-2" type="button" @click="print('printMe')" value="print">
    <div class="row m-0 mt-2" :style="{ zoom: zoom + '%' }">
    <month-range  class="mb-5" style="zoom: 95%;"
    v-model="month" :range="months" :year="year"/>    
    <div id="printMe" >
             <div class="col">
                <hr-table :value="{ h1: t('h1'), h2: t('h2'), h3: title }"/>

                <div class="col" style="text-align: right; font-style: italic;">{{ t('curency') }}</div>
                <div class="p-3" style="text-align: center;">
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
                  <div v-for="(item, i) in [
                      { title: `${t('summ fin credits')}, ${t('after date')}`, kod: '010', values: get(v => v.dt === '377') },
                      { title: `${t('summ procents')}, ${t('after date')}`, kod: '020', values: get(v => v.ct === '703') },
                      { title: `${t('summ penalty')}, ${t('after date')}`, kod: '030', values: get(v => v.ct === '704') }                  
                    ]" :key="i">
                    <penalty-row :value="item" :summ="summ" :range="range"/>
                  </div>
                    <penalty-row :summ="col"  :range="range"
                    :value="{ title: `${t('col fin credits')}, ${t('after date')}`, kod: '040', values: get(v => v.dt === '377') }"/>
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
import HrTable from './HeaderTable'
import PenaltyRow from './PenaltyRow'
import { summ, toNumber, moment } from '@/functions'
import mix from './mix'
export default {
components: { HrTable, PenaltyRow },
  mixins: [ mix ],
      data() {
        return {
          zoom: 70
        }
      },
  computed: {
    range({ monthRange }) {
      const start = monthRange.start.subtract(1, 'days')
      const end = monthRange.end
      return { start, end }
    },
    title({ monthRange, format }) {
      return `${this.t('h3')} ${format(monthRange.end)} г.`
    },
    numbers({ reestr }) {
      return reestr.filter(({ number, ref }) => number && !ref)
    }
  },
  methods: { toNumber,
    get(filter) {
      const values = v => ({...v, ...v.values.filter(filter)[0]})
      return this.numbers.map(values)
    },
    summ(values) {
      const res = summ(...values.map(v => v.summ))
        return Math.floor(toNumber(res) / 1000) || '-'
    },
    col(values) {
      return values.filter(v => toNumber(v.summ)).length || '-'
    },
    t(v) {
        return this.$t(`penalty.${v}`)
    }
  }

}
</script>

<style>

</style>