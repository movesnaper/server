<template>
    <div class="row">
        <div class="col">{{ t(value.post) }}</div>
        <div class="col border-bottom"></div>
        <div class="col ">{{ fio }}</div>
    </div>
  
</template>

<script>
import { mapGetters } from 'vuex'
export default {
    props: { value: Object },
    methods: {
        t(v) {
            return this.$t(`post.${v}`)
        }
    },
    computed: {
        fio({ value }) {
            // const [family = '', name = '', sername = ''] = (value.name || '').split(' ')
            // const first = v => name.charAt(0).toUpperCase()
            // return `${family} ${first(name)}. ${first(sername)}.`
            return value.name
        }
    }
}
</script>

<style>

</style>