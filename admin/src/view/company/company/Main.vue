<template>
  <div>
    <div v-for="({ name, is, type }, i) in items" :key="i" class="form-group row m-0 mt-2">
      <label class="col-sm-4 col-form-label" >{{ $t(`company.${name}`) }}</label>
      <component 
      class="col"
      :is="is"
      :type="type"
      :value="company[name]"
      @change="(value) => onChange(name, value)"
      />
    </div>
  </div>
</template>

<script>
import mixins from '../../company/mixins'

export default {
  mixins: [mixins],
  data: () => ({
    fields: ['name', 'idn', 'director', 'bookkeeper', 'phone']
  })
}
</script>

<style>

</style>