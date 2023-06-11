<template>
  <div class="row" style="font-size: 16px">
    <div v-for="(v) in schema" :key="v.key"
      :class="['flex-center', ...v.class]">
        {{ v.key === 'index' ? index + 1 : value[v.key] }}
    </div>
    <div class="col-1 px-0 list-item">
      <b-dropdown v-if="active" no-caret variant="outline">
        <template #button-content>
          <b-icon icon="three-dots-vertical"></b-icon>
        </template>
        <b-dropdown-item-button @click="$emit('remove', index)">Удалить</b-dropdown-item-button>
      </b-dropdown>
    </div>
  </div>
</template>

<script>
export default {
    name: 'HeaderList',
    props: ['index', 'value', 'header', 'active'],
    computed: {
      schema() {
        const keyValue = (v) => v.key ? v : ({ key: v })
        const className = (v) => ({...v, class: v.class || ['col']})
        return this.header && this.header.map(keyValue).map(className)
      }
    },
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
  .list-item {
    height: 45px;
    text-align: right;
  }
</style>