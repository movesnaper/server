<template>
  <div>
    <div v-for="({ name, type = 'text', is = 'input' }, i) in items" :key="i" 
    class="form-group row m-0 mt-2">
      <label class="col-sm-3 col-form-label" >{{ translate(name) }}</label>
      <component 
      class="col"
      :is="is"
      :type="type"
      rows="5"
      :value="value[name]"
      @change="(value) => $emit('change', { name, value })"
      />
    </div>
  </div>
</template>

<script>
export default {
  props: ['fields', 'value', 'translate'],
  computed: {
    items({ fields = [] }) {
      return fields.map((v) => ({ name: v.name || v, type: v.type || 'text', is: v.is || 'b-input' }))
    }
  }
}
</script>

<style>

</style>