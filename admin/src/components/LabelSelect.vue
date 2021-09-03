<template>
    <div class="label-select row">
      <label class="flex-center mr-3" for="input">{{ $attrs.label }}</label>
      <b-form-select
      class="col"
      id="input"
      v-on="$listeners"
      v-bind="$attrs">
      <template #first v-if="$attrs['no-selected']">
        <b-form-select-option :value="null">{{ $attrs['no-selected'] }}</b-form-select-option>
      </template>
      </b-form-select>
    </div>  
</template>

<script>
export default {
  
}
</script>

<style scoped>
  .label-select >>> label {
    margin: 0;
  }
</style>