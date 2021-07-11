<template>
  <div>
    <div v-for="({ name, is, type }, i) in items" :key="i" 
    class="form-group row m-0 mt-2">
      <label class="col-sm-4 col-form-label" >{{$t(`bank_account.${name}`)}}</label>
      <component 
      class="col"
      :is="is"
      :type="type"
      :value="bank[name]"
      @change="(value) => onChange(name, value)"
      />
    </div>
  </div>
</template>

<script>
import mixins from '../components/mixins'

export default {
  mixins: [mixins],
  data: () => ({
    fields: ['name', 'idn']
  }),
  computed: {
    bank({ value }) {
      return value.bank || {}
    }
  },
  methods: {
    onChange(key, value) {
      this.change('bank', {...this.bank, [key]: value })
    }
  }

}
</script>

<style>

</style>