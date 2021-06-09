<template>
<div class="modal-content">
  <div class="modal-header">
    <p>{{ header }}</p>
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
    <button type="button" 
    :class="['btn btn-primary', 'btn-danger', 'relative']" 
    @click="onClick" :disabled="disabled">
    <b-spinner v-if="loading" class="absolute-center"/>
    {{ title || $t('btn.remove') }}
    </button>
  </div>
</div>
</template>

<script>

export default {
  props: ['validate', 'action', 'value'],
  data() {
    return {
      data: {},
      loading: false
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
    header({value }) {
      return value.header
    },
    title({value }) {
      return value.title
    },
    isValid({ confirm = '' }) {
      return this.validate(confirm.trim())
    },
    disabled({ isValid }) {              
      const noValid = !isValid
      return [this.loading, noValid].some(v => v)
    }
  },
  methods: {
    onClick() {
      this.loading = true
      this.action(this)
    },
    t(name) {
      return this.$t(`btn.${name}`)
    },
    save () {
      this.$emit('save', this)
    },
    close () {
      this.loading = false
      this.$emit('close')
    }
  }
}
</script>

<style>

</style>
