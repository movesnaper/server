<template>
    <div>
        <div class="row border" style="border-top: 0 !important;">
            <div class="col border-right" style="text-align: left"><strong>{{ title }}</strong></div>
            <div class="col-1 border-right">{{ kod }}</div>
            <div class="col-2 border-right">{{ summ(values.filter(isOver(range.start))) }}</div>
            <div class="col-2">{{ summ(values.filter(isOver(range.end))) }}</div>
        </div>
        <div class="row border-left border-right">
            <div class="col border-right pl-5" style="text-align: left"><strong>{{ t('gold and stounes') }}</strong></div>
            <div class="col-1 border-right">{{ `0${toNumber(kod) + 1}` }}</div>
            <div class="col-2 border-right">{{ summ(values.filter(gold).filter(isOver(range.start))) }}</div>
            <div class="col-2">{{ summ(values.filter(gold).filter(isOver(range.end))) }}</div>
        </div>
        <div class="row border-left border-right">
            <div class="col border-right pl-5" style="text-align: left">{{ t('before month') }}</div>
            <div class="col-1 border-right">{{ `0${toNumber(kod) + 2}` }}</div>
            <div class="col-2 border-right">{{ summ(values.filter(gold).filter(isOver(range.start, v => !(v > 30)))) }}</div>
            <div class="col-2">{{ summ(values.filter(gold).filter(isOver(range.end, v => !(v > 30)))) }}</div>
        </div>
        <div class="row border-left border-right border-bottom">
            <div class="col border-right pl-5" style="text-align: left">{{ t('after month') }}</div>
            <div class="col-1 border-right">{{ `0${toNumber(kod) + 3}` }}</div>
            <div class="col-2 border-right">{{ summ(values.filter(gold).filter(isOver(range.start, v => v > 30))) }}</div>
            <div class="col-2">{{ summ(values.filter(gold).filter(isOver(range.end, v => v > 30))) }}</div>
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
        }
    },
    methods: { toNumber,
        gold({ zalog }) {
            return zalog === 'gold'
        },
        isOver(date, f = v => v > 0) {
            const vDate = v => moment(v.date).add(v.days, 'days')
            return v => [
                !date.isSameOrBefore(v.date, 'day'),
                this.usedBefore(v, date),
                f(date.diff(vDate(v), 'days'))]
                .every(v => v)
        },
        usedBefore({_id}, mDate) {
            const { date } = {...this.used[_id]}
            return v => !date || mDate.isBefore(date, 'day')
        },
        t(v) {
            return this.$t(`penalty.${v}`)
        }      
    }
}
</script>

<style>

</style>