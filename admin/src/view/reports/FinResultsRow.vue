<template>
    <div class="row border"  :style="style">
        <div class="col border-right" :style="{'text-align': value.style === 'second' ? 'right' : 'left'}">
        {{ title }}</div>
        <div class="col-1 border-right">{{ kod }}</div>
        <div class="col-2 border-right" style="text-align: right;">
          {{ item.value && item.value(value.start) || '-' }}
        </div>
        <div class="col-2" style="text-align: right;">
          {{  item.value && item.value(value.end) || '-' }}
        </div>
    </div>
</template>

<script>
import mix from './mix'
export default {
    mixins: [ mix ],
    props: ['item', 'value'],
    computed: {
        title({ item }) {
            return item.title
        },
        kod({ item }) {
            return item.kod
        },
        style({ item }) {
            if (item.style === 'first') return 'font-weight: bold; border-top: 0 !important; border-bottom: 0 !important;'
            if (item.style === 'second') return 'border-top: 0 !important; border-bottom: 0 !important;'
            return 'font-weight: bold; border-top: 0 !important;'
        }
    }
}
</script>

<style>

</style>