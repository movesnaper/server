<template>
  <div>
    <div class="row mb-2" style="max-width: 300px;">
      <label class="px-0 col-sm-4 col-form-label" ><strong>Date</strong></label>
      <b-input 
      class="col"
      type="date"
      :value="accounts.date"
      @change="onDateChange"
      />
    </div>
    <div class="row">
      <div class="col-2"><strong>Dt</strong></div>
      <div class="col">Title</div>
      <div class="col-3">Summ</div>
      <div v-for="({ acc, title, summ, add }, i) in [...dt, { add: true }]" :key="i"
      :class="['row m-0 mt-1', { add }]" style="width: 100%">
        <input type="text" class="col-2 form-control mr-1" :value="acc"
        @change="({ target }) => onChange('dt', { acc: target.value }, i)">
        <input type="text" class="col form-control mr-1" :value="title" 
        @change="({ target }) => onChange('dt', { title: target.value }, i)">
        <input type="text" class="col-3 form-control" :value="summ"
        @change="({ target }) => onChange('dt', { summ: target.value }, i)">
      </div>
    </div>
    <div class="row mt-2">
    <div class="col-2"><strong>Ct</strong></div>
    <div class="col">Title</div>
    <div class="col-3">Summ</div>
      <div v-for="({ acc, title, summ, add }, i) in [...ct, { add: true }]" :key="i"
      :class="['row m-0 mt-2', { add }]" style="width: 100%">
        <input type="text" class="col-2 form-control mr-1" :value="acc"
        @change="({ target }) => onChange('ct', { acc: target.value }, i)">
        <input type="text" class="col form-control mr-1" :value="title"
        @change="({ target }) => onChange('ct', { title: target.value }, i)">
        <input type="text" class="col-3 form-control" :value="summ"
        @change="({ target }) => onChange('ct', { summ: target.value }, i)">
      </div>
    </div>
  </div>
</template>

<script>
import mix from './mix'
export default {
  mixins: [ mix ],
  computed: {
    accounts({ lombard }) {
      return {...lombard.accounts }
    },
    dt({ accounts }) {
      return accounts.dt || []
    },
    ct({ accounts }) {
      return accounts.ct || []
    }
  },
  methods: {
    onChange(type, v, i) {
      this[type][i] = {...this[type][i], ...v }
      const accounts = {...this.accounts, [type]: this[type].filter(({ acc }) => !!acc)}
      this.save({...this.lombard, accounts })
    },
    onDateChange(date) {
      const accounts = {...this.accounts, date}
      this.save({...this.lombard, accounts })
    }
  }
}
</script>

<style>

</style>