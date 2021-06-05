<template>
  <div>
    <div class="row border" style="border-top: 0 !important;">
      <div class="col border-right" style="text-align: left"><strong>{{ title }}</strong></div>
      <div class="col-1 border-right">{{ kod }}</div>
      <div class="col-2 border-right">{{ getSumm(value.start) }}</div>
      <div class="col-2">{{ getSumm(value.end) }}</div>
    </div>
    <div v-for="({ title, is, filter }, i) in values" :key="i"  class="row border-left border-right">
      <div class="col border-right pl-5" style="text-align: left">
        <component :is="is || 'span'">{{ title }}</component>
      </div>
      <div class="col-1 border-right">{{ `0${toNumber(kod) + 1}` }}</div>
      <div class="col-2 border-right">{{ getSumm(value.start, filter) }}</div>
      <div class="col-2">{{ getSumm(value.end, filter) }}</div>
    </div>
  </div>
</template>

<script>
import { toNumber } from '@/functions'
const gold = (v) => v.zalog === 'gold'

export default {
    props: ['title', 'kod', 'summ', 'value', 'format'],
    computed: {
      values({ t }) {
        return [
          { title: t('gold and stounes'), is: 'strong', filter: gold },
          { title: t('before month'), is: 'strong', filter: (v) => gold(v) && v.dif < 30 },
          { title: t('before month'), is: 'strong', filter: (v) => gold(v) && v.dif >= 30 },
        ]
      }
    },
    methods: { 
      toNumber,
      getSumm(values = [], filter = () => true) {
        const summ = this.summ || (() => 1)
        const format = this.format || ((v) => Math.floor(toNumber(v) / 1000))
        const value = values.filter(filter).reduce((cur, v) => {
          return cur + toNumber(summ(v))
        }, 0)
        return format(value) || '-'
      },
      t(v) {
          return this.$t(`penalty.${v}`)
      }      
    }
}
</script>

<style>

</style>