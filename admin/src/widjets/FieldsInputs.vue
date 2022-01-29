<template>
  <div>
    <div v-for="({ key, value: text, type = 'text', is = 'b-input' }) in fields" :key="key"
    class="form-group row m-0 mt-2">
      <label class="col-sm-3 col-form-label" >{{ text }}</label>
      <component
        class="col"
        :is="is"
        :type="type"
        rows="5"
        :value="value[key]"
        @input="(value) => $emit('input', { key, value })"
        @change="(value) => $emit('change', { key, value })"/>
    </div>
  </div>
</template>

<script>
export default {
  props: ['fields', 'value']
}
</script>

<style>

</style>
