<template>
  <div :class="['accordion', 'px-0']" role="tablist">
    <b-card no-body class="px-0">
      <b-card-header class="py-0 pointer" role="tab" v-b-toggle="fieldKey">
        <header-list :header="['header']" :value="{header}"/>
      </b-card-header>
      <b-collapse 
      v-model="visible"
      accordion="accordion" 
      role="tabpanel" 
      :id="fieldKey" >
        <b-card-body>
          <fields-inputs v-for="(field) in schema" :key="field.key"
          :schema="[field]"
          :fieldKey="field.key"
          :value="value"
          @input="setValue"
          @change="change"/>
        </b-card-body>
      </b-collapse>
    </b-card>

  </div>
</template>

<script>

export default {
  name: 'FieldsObject',
  components: {
    HeaderList: () => import('./HeaderList.vue'),
    FieldsInputs: () => import('./FieldsInputs.vue')
  },
  props: ['value', 'fieldKey', 'schema', 'header'],
  data: () => ({
    visible: false
  }),
  methods: {
    setValue([key, value]) {
      this.value[key] = value
    },
    change() {
      this.$emit('change')
    }
  }
}
</script>

<style scoped>
  .accordion {
    width: 100%;
  }
</style>
