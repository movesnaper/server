<template>
    <div class="row border"  :style="style">
        <div class="col border-right" :style="{'text-align': value.style === 'second' ? 'right' : 'left'}">
        {{ title }}</div>
        <div class="col-1 border-right">{{ kod }}</div>
        <div class="col-2 border-right" style="text-align: right;">
            {{ kod ? summ(values.filter(isOver(range.start))) : '' }}
        </div>
        <div class="col-2" style="text-align: right;">
            {{ kod ? summ(values.filter(isOver(range.end))) : '' }}
        </div>
    </div>
</template>

<script>
import { toNumber, moment } from '@/functions'
import mix from './mix'
export default {
    mixins: [ mix ],
    props: { value: Object, summ: Function, range: Object },
    computed: {

        title({ value }) {
            return value.title
        },
        kod({ value }) {
            return value.kod
        },
        values({ value }) {
            return value.values || []
        },
        style({ value }) {
            if (value.style === 'first') return 'font-weight: bold; border-top: 0 !important; border-bottom: 0 !important;'
            if (value.style === 'second') return 'border-top: 0 !important; border-bottom: 0 !important;'
            return 'font-weight: bold; border-top: 0 !important;'
        },
        
    },
    methods: {
        isOver(range) {
            // const { start, end } = range
            // console.log(start.format('L'), end.format('L'));
            
            // return v => true
            // const vDate = v => moment(v.date).add(v.days, 'days')

            return v => [
                range.contains(moment(v.date))
                // date.isSameOrBefore(v.date, 'day'),
                // this.usedBefore(v, date),
                // f(date.diff(vDate(v), 'days'))
            ].every(v => v)
        }
    }
}
</script>

<style>

</style>