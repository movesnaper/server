<template>
<div class="modal-content">
    <div class="modal-header">
    <button type="button" class="close" @click="close">
        <span aria-hidden="true">&times;</span>
    </button>
    </div>
    <div class="modal-body">
        <div v-html="html"></div>
        <input type="text" class="form-control" v-model="confirm">
    </div>
    <div class="modal-footer">
    <button type="button" class="btn btn-secondary" @click="close">{{ t('cansel') }}</button>
    <button type="button" :class="['btn btn-primary', 'btn-danger']" @click="action().then(close)" :disabled="disabled">{{ t(title) }}</button>
    </div>
</div>
</template>

<script>

import { mapActions, mapGetters } from 'vuex'
export default {
props: { validate: Function, action: Function, value: Object },
data() {
    return {
        data: {}
    }
},
computed: {

    confirm: {
        get({ data, value }) {
            return {...data}.confirm
        },
        set(confirm) {
            this.data = {...this.data, confirm}
        }
    },
    html({ value }) {
        return {...value}.html
    },
    title({value }) {
        return value.title
    },
    isValid({ confirm = '' }) {
        return this.validate(confirm.trim())
    },
    disabled({ isValid }) {              
        const noValid = !isValid
        return [noValid].some(v => v)
    }
},

methods: {
    t(name) {
        return this.$t(`btn.${name}`)
    },
    save () {
        this.$emit('save', this)
    },
    close () {
        this.$emit('close')
    }
}

}
</script>

<style>

</style>
