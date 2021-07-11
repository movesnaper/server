<template>
  <div>
    <div v-for="({ name, is, type }, i) in items" :key="i" class="form-group row m-0 mt-2">
      <label class="col-sm-4 col-form-label" >{{$t(`bank_account.${name}`)}}</label>
      <component 
      class="col"
      :is="is"
      :type="type"
      :value="value[name]"
      @change="(value) => change(name, value)"
      />
    </div>
  </div>
</template>

<script>
import mixins from './mixins'

export default {
  mixins: [mixins],
  data: () => ({
    fields: [
      'number',
      { name: 'date', type: 'date' },
      { name: 'description', is: 'b-form-textarea' }
    ]
  })

}
</script>

<style>

</style>