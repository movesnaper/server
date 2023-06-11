<template>
  <div :class="['accordion', 'px-0']" role="tablist">
    <b-card v-for="(item, index) in value || []" :key="index" no-body class="px-0">
      <b-card-header class="py-0 pointer" role="tab" v-b-toggle="`${fieldKey}-${index}`">
        <header-list
        :header="header"
        :index="index" 
        :value="item || {}"
        :active="visible[index]"
        @remove="remove"/>
      </b-card-header>
      <b-collapse v-model="visible[index]" accordion="accordion" role="tabpanel" :id="`${fieldKey}-${index}`" >
        <b-card-body>
            <fields-inputs v-for="(field) in schema" :key="field.key"
            :schema="[field]"
            :value="item"
            @input="(v) => setValue(item, v)"
            :fieldKey="field.key"
            @change="change"/>
        </b-card-body>
      </b-collapse>
    </b-card>
    <b-button variant="outline" @click="add" class="relative" >
      <b-icon icon="plus-circle" variant="success"/>
    </b-button>
  </div>
</template>

<script>

export default {
  name: 'FieldsList',
  components: {
    HeaderList: () => import('./HeaderList.vue'),
    FieldsInputs: () => import('./FieldsInputs.vue')
  },
  props: ['value', 'schema', 'header', 'fieldKey'],
  data: () => ({
    visible: {}
  }),
  methods: {
    setValue(item, [key, value]) {
      item[key] = value
    },
    change() {
      this.$emit('change')
    },
    async add() {
      const value = this.schema.reduce((cur, {key}) => ({...cur, [key]: ''}), {})
      this.value.push(value)
      this.change()
    },

    async remove (index) {
      this.value.splice(index, 1)
      this.change()
    }
  }
}
</script>

<style scoped>
  .accordion {
    width: 100%;
  }
</style>
