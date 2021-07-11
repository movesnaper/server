<template>
  <div>
    <div v-for="({ name, is, type }, i) in items" :key="i" 
    class="form-group row m-0 mt-2">
      <label class="col-sm-4 col-form-label" >{{$t(`address.${name}`)}}</label>
      <component 
      class="col"
      :is="is"
      :type="type"
      :value="address[name]"
      @change="(value) => onChange(name, value)"
      />
    </div>
  </div>
</template>

<script>
import mixins from './mixins'

export default {
  mixins: [mixins],
  data: () => ({
    fields: ['city', 'region', 'district', 'street', 'home']
  }),
  computed: {
    address({ value }) {
      return value.address || {}
    }
  },
  methods: {
    onChange(key, value) {
      this.change('address', {...this.address, [key]: value })
    }
  }

}
</script>

<style>

</style>