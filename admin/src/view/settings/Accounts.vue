<template>
  <div>
    <div class="row mb-2 ml-0">
      <label class="pl-0 col-2 col-form-label">
        <strong>{{ $t('settings.accounts.date')}}</strong>
      </label>
      <b-input class="col ml-2" type="date" style="max-width: 300px;"
      :value="accounts.date" 
      @change="onDateChange"/>
    </div>
    <div class="row ml-0">
      <div class="col-2 p-0"></div>
      <div class="col">{{ $t('settings.accounts.title')}}</div>
      <div class="col-2">{{ $t('settings.accounts.value')}}</div>
      <div v-for="({ key, title, value, add }, i) in [...values, { add: true }]" :key="i"
      :class="['row m-0 mt-1', { add }]" style="width: 100%">
        <input type="text" class="col-2 form-control mr-2" :value="key"
        @change="({ target }) => target.value ? setValue(target.value, { key: target.value })
          : remove(key)">
        <input type="text" class="col form-control mr-1" :value="title" 
        @change="({ target }) => setValue(key, { title: target.value })">
        <input type="text" class="col-2 form-control" :value="value"
        @change="({ target }) => setValue(key, { value: target.value })">
      </div>
    </div>
    <div class="row ml-0">
      <div class="col-1"><strong>Dt</strong></div>
      <div class="col-1"><strong>Ct</strong></div>
      <div class="col">{{ $t('settings.accounts.title')}}</div>
      <div class="col-2">{{ $t('settings.accounts.summ')}}</div>
      <div v-for="({ acc, ct, title, summ, add }, i) in [...dt, { add: true }]" :key="i"
      :class="['row m-0 mt-1', { add }]" style="width: 100%">
        <input type="text" class="col-1 form-control mr-1" :value="acc"
        @change="({ target }) => onChange('dt', { acc: target.value }, i)">
        <input type="text" class="col-1 form-control mr-1" :value="ct"
        @change="({ target }) => onChange('dt', { ct: target.value }, i)">
        <input type="text" class="col form-control mr-1" :value="title" 
        @change="({ target }) => onChange('dt', { title: target.value }, i)">
        <input type="text" class="col-2 form-control" :value="summ"
        @change="({ target }) => onChange('dt', { summ: target.value }, i)">
      </div>
    </div>
    <div class="row mt-2 ml-0">
    <div class="col-1"><strong>Ct</strong></div>
    <div class="col-1"><strong>Dt</strong></div>
    <div class="col">{{ $t('settings.accounts.title')}}</div>
    <div class="col-2">{{ $t('settings.accounts.summ')}}</div>
      <div v-for="({ acc, dt, title, summ, add }, i) in [...ct, { add: true }]" :key="i"
      :class="['row m-0 mt-2', { add }]" style="width: 100%">
        <input type="text" class="col-1 form-control mr-1" :value="acc"
        @change="({ target }) => onChange('ct', { acc: target.value }, i)">
        <input type="text" class="col-1 form-control mr-1" :value="dt"
        @change="({ target }) => onChange('ct', { dt: target.value }, i)">
        <input type="text" class="col form-control mr-1" :value="title"
        @change="({ target }) => onChange('ct', { title: target.value }, i)">
        <input type="text" class="col-2 form-control" :value="summ"
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
    values({ accounts }) {
      return Object.values(accounts).filter((v) => !!v.key)
    },
    dt({ accounts }) {
      return accounts.dt || []
    },
    ct({ accounts }) {
      return accounts.ct || []
    }
  },
  methods: {
    setValue(key, v) {
      const value = {...this.accounts[key], ...v }
      const accounts = {...this.accounts, [key]: value }
      this.save({...this.lombard, accounts })
    },
    remove(key) {
      const accounts = {...this.accounts, [key]: undefined }
      this.save({...this.lombard, accounts })
    },
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