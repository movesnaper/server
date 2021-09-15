<template>
  <div class="month-period">
   <div class="row m-0">
      <label-select 
        v-for="({ key, values, label, noSelected }, i) in filters" :key="i" 
        class="col p-0 mr-3"
        :label="label"
        :options="values"
        :no-selected="noSelected"
        :value="value[key] || null"
        @input="(value) => setValue(key, value)"
        text-field="text"
        valuet-field="value"/>
        <div class="col"></div>
        <b-button
          variant="outline-primary"
          :disabled="!$slots.default"
          @click="$emit('print')">
          {{ $t('btn.print') }}
        </b-button>
    </div>
    
    <slot></slot>
  </div>
</template>

<script>
import LabelSelect from '@/components/LabelSelect'

export default {
  name: 'MonthPeriod',
  components: { LabelSelect },
  props: ['value', 'filters'],
  methods: {
    setValue(key, value) {
      this.$emit('input', {...this.value, [key]: value})
    }
  }
}
</script>

<style >

</style>