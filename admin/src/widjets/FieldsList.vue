<template>
  <div :class="['accordion', 'px-0']" role="tablist">
    <b-card v-for="(item, index) in values" :key="index" no-body class="px-0">
      <b-card-header class="py-0 pointer" role="tab" v-b-toggle="`program-${index}`">
        <header-list
        :schema="header"
        :index="index" 
        :value="item"
        @remove="remove"
        :loading="loading"/>
      </b-card-header>
      <b-collapse v-model="visible[index]" accordion="accordion" role="tabpanel" :id="`program-${index}`" >
        <b-card-body class="pt-0">
          <fields-inputs
          :schema="schema"
          :value="item"
          @input="(v) => setValue(index, v)"
          @change="$emit('change')"/>
        </b-card-body>
      </b-collapse>
    </b-card>
    <b-button variant="outline" @click="add" class="relative" :disabled="loading">
      <b-icon icon="plus-circle" variant="success"/>
      <b-spinner v-if="loading" class="absolute-center"/>
    </b-button>
  </div>
</template>

<script>

export default {
  name: 'FieldList',
  components: {
    HeaderList: () => import('./HeaderList.vue'),
    FieldsInputs: () => import('./FieldsInputs.vue')
  },
  props: ['value', 'fieldKey', 'schema', 'header', 'loading'],
  data: () => ({
    visible: {}
  }),
  computed: {
    values() {
      return (this.value || {})[this.fieldKey] || this.value 
    }
  },

  methods: {
    setValue(index, value) {
      this.values[index] = value
      // this.values.splice(index, 1, value)
    },
    change() {
      this.$emit('change')
    },
    
    async add() {
      this.values.push({})
      this.change()
    },

    async remove ({index, name}) {
      // const dialog = await this.$confirm({ name })
      this.values.splice(index, 1)
      this.change()
      // dialog.close()
    }
  }
}
</script>

<style scoped>
  .simple >>>  .btn {
    text-align: left;
    border: 1px solid black;
    box-shadow: none;
  }
  .simple >>>  .dropdown-menu {
    width: 100%;
  }
</style>
