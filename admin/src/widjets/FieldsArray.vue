<template>
  <b-card :class="['col','px-0']">
    <div v-for="(item, index) in value" :key="index">
        <fields-inputs
          :schema="[schema]"
          :value="value"
          @input="(v) => setValue(index, v)"
          :fieldKey="index"
          @change="change">
          <template #append>
            <b-dropdown variant="outline" class="dropdown px-0">
              <template #button-content>
                <b-icon icon="three-dots-vertical" variant="outline"/>
              </template>
              <b-dropdown-item-button variant="danger" @click.stop="() => remove(index)">
                <b-icon icon="trash-fill" aria-hidden="true"/> Delete
              </b-dropdown-item-button>        
            </b-dropdown>
          </template>
        </fields-inputs>
    </div>
    <b-button variant="outline" @click="add" class="relative" >
      <b-icon icon="plus-circle" variant="success"/>
    </b-button>
  </b-card>
</template>

<script>

export default {
  name: 'FieldsArray',
  components: {
    FieldsInputs: () => import('./FieldsInputs.vue')
  },
  props: ['value', 'schema', 'fieldKey'],
  methods: {
    setValue(index, [key, value]) {
      this.value[index] = value
    },
    change() {
      this.$emit('change')
    },
    
    async add() {
      this.value.push('')
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
  .dropdown >>> .dropdown-toggle::after {
    display: none;
  }
</style>
