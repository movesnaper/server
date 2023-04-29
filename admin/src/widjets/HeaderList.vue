<template>
  <div class="row" style="font-size: 16px">
    <div v-for="(key) in schema" :key="key"
      :class="['flex-center', key === 'index' ? 'col-1' : 'col-2']">
        {{ getValue(key) }}
    </div>
    <div class="col" style="text-align: right">
      <b-dropdown variant="outline" class="dropdown px-0">
        <template #button-content>
          <b-icon icon="three-dots-vertical" variant="outline"/>
        </template>
        <b-dropdown-item-button variant="danger"
        @click.stop="$emit('remove', {index, name: value.account})">
          <b-icon icon="trash-fill" aria-hidden="true"/> Delete
        </b-dropdown-item-button>        
      </b-dropdown>
        <!-- <b-button variant="outline" :disabled="loading">
            <b-icon icon="trash" @click.stop="$emit('remove', {index, name: value.account})" variant="danger"/>
        </b-button> -->
    </div>
  </div>
</template>

<script>
export default {
    props: ['index', 'value', 'schema'],
    methods: {
        getValue(key) {
            return key === 'index' ? this.index + 1 : this.value[key]
        }
    }

}
</script >

<style scoped>
  .dropdown >>> .dropdown-toggle::after {
    display: none;
  }
</style>